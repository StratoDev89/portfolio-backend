export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, username, password } = object;

    return new UserEntity(id || _id, username, password);
  }
}
