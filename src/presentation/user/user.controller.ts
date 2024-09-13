import { Request, Response } from "express";
import { CustomError, UpdateUser, UserRepository, LoginUser, RecoveryPassword, ChangePassword, ChangePasswordDto } from "../../domain";

export class UserController {
  constructor(private userRepository: UserRepository) {}

  login = (req: Request, res: Response) => {
    const data = req.body.loginUserDto;

    new LoginUser(this.userRepository)
      .execute(data)
      .then((user) => res.status(200).json(user))
      .catch((error) => {
        this.errorHandler(error, res);
      });
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const data = { id, username, password };

    new UpdateUser(this.userRepository)
      .execute(data)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => this.errorHandler(error, res));
  };

  recovery = (req: Request, res: Response) => {
    const { email } = req.body;

    new RecoveryPassword(this.userRepository)
      .execute(email)
      .then((emailSent) => res.status(200).json({ emailSent }))
      .catch((error) => this.errorHandler(error, res));
  };

  changePassword = (req: Request, res: Response) => {
    const { password } = req.body;
    const token = req.headers.authorization?.split(" ").at(1);

    const data = { password, token } as ChangePasswordDto;

    new ChangePassword(this.userRepository)
      .execute(data)
      .then((wasUpdated) => res.status(200).json({ wasUpdated }))
      .catch((error) => this.errorHandler(error, res));
  };

  check = (req: Request, res: Response) => {
    res.status(200).json({ message: "valid token" });
  };

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
