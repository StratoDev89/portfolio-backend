import {
  ChangePasswordDto,
  CustomError,
  LoginUserDto,
  UpdateUserDto,
  UserDatasource,
  UserEntity,
} from "../../../../domain";
import { UserModel } from "../../../../data/mongo";
import {
  BcryptAdapter,
  JwtAdapter,
  NodeMailerAdapter,
  envs,
} from "../../../../config";

export class UserDatasourceImpl implements UserDatasource {
  async login(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ username: loginUserDto.username });
    if (!user) throw CustomError.badRequest("User not found");

    const isMatching = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isMatching) throw CustomError.badRequest("User or Password Invalid");

    const payload = {
      sub: user.id,
    };

    const token = JwtAdapter.generateToken(payload);
    if (!token) throw CustomError.internalServer("Internal server error");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    return { user: userEntity, token };
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { id, ...updates } = updateUserDto;

    const user = await UserModel.findById(id);
    if (!user) throw CustomError.badRequest("User not found");

    if (updates.password) {
      updates.password = BcryptAdapter.hash(updates.password);
    }

    const userUpdated = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!userUpdated) throw CustomError.internalServer("Internal server error");

    return UserEntity.fromObject(userUpdated);
  }

  async sendRecoveryEmail(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest("User not found");

    const userEntity = UserEntity.fromObject(user);

    const payload = { sub: userEntity.id };

    const token = JwtAdapter.generateToken(payload, "15m");

    return await this.sendEmail(token);
  }

  private async sendEmail(token: string) {
    const options = {
      to: envs.CLIENT_EMAIL,
      subject: "Recovery password",
      htmlBody: `
        <h1>Follow this link to recovery your password<h1/>
    <p>${envs.FRONTEND_HOST}/auth/change-password?${token}</p>
    `,
    };

    return await NodeMailerAdapter.sendEmail(options);
  }

  async changePassword(options: ChangePasswordDto): Promise<boolean> {
    const { password, token } = options;

    const [payload, error] = JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.internalServer(`${error}`);

    const userId = payload.sub;
    const hash = BcryptAdapter.hash(password);

    const userUpdated = await UserModel.findByIdAndUpdate(userId, {
      password: hash,
    });

    if (!userUpdated) throw CustomError.internalServer("Internal Server Error");

    return true;
  }
}
