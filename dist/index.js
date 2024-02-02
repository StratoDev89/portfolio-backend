"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
const mongo_1 = require("./data/mongo");
const presentation_1 = require("./presentation");
(() => __awaiter(void 0, void 0, void 0, function* () {
    main();
}))();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongo_1.MongoConnection.connect({
            mongoURL: envs_1.envs.DB_URL,
            dbName: envs_1.envs.DB_NAME,
        });
        const server = new presentation_1.Server({
            port: envs_1.envs.PORT || 3000,
            routes: presentation_1.AppRoutes.routes,
        });
        server.start();
    });
}
