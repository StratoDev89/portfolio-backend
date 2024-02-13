import { UserRepository } from "../..";
import { LoginUserDto } from "../../dtos/users/login-user/login-user.dto";

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<string>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(loginUserDto: LoginUserDto): Promise<string> {
    return this.userRepository.login(loginUserDto);
  }
}
