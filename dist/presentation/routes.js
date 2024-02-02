"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const _1 = require(".");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/projects", _1.ProjectRoutes.routes);
        router.use("/api/certifications", _1.CertificationRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
