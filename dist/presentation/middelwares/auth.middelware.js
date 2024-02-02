"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddelware = void 0;
const config_1 = require("../../config");
const password = config_1.envs.ADMIN_PASSWORD;
class AuthMiddelware {
    static checkAuthHeaders(req, res, next) {
        const auth = req.headers.authorization;
        if (!auth || auth !== password) {
            res.status(401).json({ error: "Autorization Error" });
            return;
        }
        next();
    }
}
exports.AuthMiddelware = AuthMiddelware;
