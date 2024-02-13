import {
  ChangePasswordDto,
  LoginUserDto,
  UpdateUserDto,
  UserDatasource,
  UserEntity,
  UserRepository,
} from "../../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private userDatasource: UserDatasource) {}


  login(loginUserDto: LoginUserDto): Promise<any> {
    return this.userDatasource.login(loginUserDto);
  }

  update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userDatasource.update(updateUserDto);
  }

  sendRecoveryEmail(email: string): Promise<boolean> {
    return this.userDatasource.sendRecoveryEmail(email);
  }

  changePassword(options: ChangePasswordDto): Promise<boolean> {
    return this.userDatasource.changePassword(options);
  }
}
