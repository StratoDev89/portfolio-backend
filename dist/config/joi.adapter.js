"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiAdapter = void 0;
const joi_1 = __importDefault(require("joi"));
class JoiAdapter {
    static validateCreateProjectSchema(data) {
        const schema = joi_1.default.object({
            title: this.title.required(),
            description: this.description.required(),
            techs: this.techs.required(),
        });
        const { error } = schema.validate(data);
        if (error) {
            return [false, error.message];
        }
        return [true, undefined];
    }
    static validateCreateCertificationSchema(data) {
        const schema = joi_1.default.object({
            title: this.title.required(),
        });
        const { error } = schema.validate(data);
        if (error) {
            return [false, error.message];
        }
        return [true, undefined];
    }
    static validateUpdateProjectSchema(data) {
        const schema = joi_1.default.object({
            title: this.title,
            description: this.description,
            techs: this.techs,
            image: this.image,
        });
        const { error } = schema.validate(data);
        if (error) {
            return [false, error.message];
        }
        return [true, undefined];
    }
    static validateUpdateCertificationSchema(data) {
        const schema = joi_1.default.object({
            title: this.title,
            url: this.url,
        });
        const { error } = schema.validate(data);
        if (error) {
            return [false, error.message];
        }
        return [true, undefined];
    }
}
exports.JoiAdapter = JoiAdapter;
JoiAdapter.title = joi_1.default.string();
JoiAdapter.description = joi_1.default.string();
JoiAdapter.techs = joi_1.default.string();
JoiAdapter.image = joi_1.default.any();
JoiAdapter.url = joi_1.default.string();
