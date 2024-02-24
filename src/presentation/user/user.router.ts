import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepositoryImpl } from "../../infraestructure";
// import { UserDatasourceImpl, UserRepositoryImpl } from "../../infraestructure";
import { ValidationMiddelware, AuthMiddelware } from "..";
// import { Validators } from "../../config";
import { UserMySqlDatasourceImpl } from "../../infraestructure/users/datasource/mysql/user.mysql.datasource.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // const userDatasourceImpl = new UserDatasourceImpl();
    const userMySqlDatasourceImpl = new UserMySqlDatasourceImpl();

    const userrepositoryImpl = new UserRepositoryImpl(userMySqlDatasourceImpl);

    const controller = new UserController(userrepositoryImpl);

    router.post(
      "/login",
      ValidationMiddelware.validateLoginUserData,
      controller.login
    );

    router.put(
      "/:id",
      // ValidationMiddelware.mongoIdValidator,
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
