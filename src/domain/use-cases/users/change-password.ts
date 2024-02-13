import { ChangePasswordDto, UserRepository } from "../..";

interface ChangePasswordUseCase {
  execute(options: ChangePasswordDto): Promise<boolean>;
}

export class ChangePassword implements ChangePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(options: ChangePasswordDto): Promise<boolean> {
    return this.userRepository.changePassword(options);
  }
}
