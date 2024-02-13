import { ChangePasswordDto, LoginUserDto, UpdateUserDto, UserEntity } from "..";

export abstract class UserRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<any>;
  abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract sendRecoveryEmail(email: string): Promise<boolean>;
  abstract changePassword(options: ChangePasswordDto): Promise<boolean>;
}
