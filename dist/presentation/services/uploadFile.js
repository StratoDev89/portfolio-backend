"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const domain_1 = require("../../domain");
const config_1 = require("../../config");
class UploadFileService {
    static checkFolder(folderPath) {
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
    }
    static uploadSingle(file, folder, validExtensions = ["jpg", "jpeg", "webp", "gif", "png"]) {
        try {
            const extension = file.mimetype.split("/").at(1);
            if (!extension || !validExtensions.includes(extension)) {
                throw domain_1.CustomError.badRequest("Invalid file extension");
            }
            const destination = path_1.default.resolve(__dirname, "../../../", folder);
            const filename = `${config_1.UUIDAdapter.v4()}.${extension}`;
            const filePath = path_1.default.join(destination, filename);
            this.checkFolder(destination);
            fs_1.default.writeFileSync(filePath, file.buffer);
            return filename;
        }
        catch (error) {
            console.log({ error: error.message });
            return null;
        }
    }
    static deleteFile(filename, folder) {
        const filePath = path_1.default.resolve(__dirname, "../../../", folder, filename);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.rmSync(filePath);
        }
    }
    uploadMultiple() { }
}
exports.UploadFileService = UploadFileService;
