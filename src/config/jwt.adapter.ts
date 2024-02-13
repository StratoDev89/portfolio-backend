import { sign, verify } from "jsonwebtoken";
import { envs } from "./envs";

const secret = envs.JWT_SECRET_KEY;

export class JwtAdapter {
  static generateToken(payload: any, duration = "2h") {
    return sign(payload, secret, { expiresIn: duration });
  }

  static validateToken(token: string) {
    try {
      const isValid = verify(token, secret);
      return [isValid, undefined];
    } catch (error: any) {
      return [false, error.message];
    }
  }
}
