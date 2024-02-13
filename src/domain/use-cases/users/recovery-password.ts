import { UserRepository } from "../..";

export interface RecoveryPasswordUseCase {
  execute(email: string): Promise<boolean>;
}

export class RecoveryPassword implements RecoveryPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(email: string): Promise<boolean> {
    return this.userRepository.sendRecoveryEmail(email);
  }
}
