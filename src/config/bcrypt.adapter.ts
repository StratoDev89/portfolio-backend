import { hashSync, compareSync } from "bcryptjs";

export class BcryptAdapter {
  static hash(password: string) {
    return hashSync(password, 10);
  }

  static compare(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
