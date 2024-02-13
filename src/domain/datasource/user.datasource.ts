import { LoginUserDto, UpdateUserDto, UserEntity, ChangePasswordDto } from "..";

export abstract class UserDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<any>;
  abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract sendRecoveryEmail(email: string): Promise<boolean>;
  abstract changePassword(options: ChangePasswordDto): Promise<boolean>;
}
