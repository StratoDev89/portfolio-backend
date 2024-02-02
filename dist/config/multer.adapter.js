"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterAdapter = void 0;
const multer_1 = __importDefault(require("multer"));
class MulterAdapter {
    static fileMiddelware() {
        return (0, multer_1.default)({
            storage: this.filesStorage,
        });
    }
}
exports.MulterAdapter = MulterAdapter;
MulterAdapter.filesStorage = multer_1.default.memoryStorage();
