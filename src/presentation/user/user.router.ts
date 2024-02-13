import { Router } from "express";
import { UserController } from "./user.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";
import { Validators } from "../../config";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userDatasourceImpl = new UserDatasourceImpl();
    const userrepositoryImpl = new UserRepositoryImpl(userDatasourceImpl);

    const controller = new UserController(userrepositoryImpl);

    router.post(
      "/login",
      ValidationMiddelware.validateLoginUserData,
      controller.login
    );

    router.put(
      "/:id",
      ValidationMiddelware.mongoIdValidator,
      AuthMiddelware.checkAuthHeaders,
      controller.update
    );

    router.post(
      "/recovery",
      ValidationMiddelware.validateEmailData,
      controller.recovery
    );

    router.get(
      "/change-password",
      AuthMiddelware.checkAuthHeaders,
      ValidationMiddelware.validatePasswordlData,
      controller.changePassword
    );

    return router;
  }
}
