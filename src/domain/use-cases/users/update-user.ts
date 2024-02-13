import { UserEntity, UserRepository, UpdateUserDto } from "../..";

interface UpdateUsertUseCase {
  execute(updateUsertDto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUsertUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(updateUsertDto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.update(updateUsertDto);
  }
}
