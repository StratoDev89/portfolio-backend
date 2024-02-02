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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationDatasourceImpl = void 0;
const mongo_1 = require("../../../data/mongo");
const domain_1 = require("../../../domain");
class CertificationDatasourceImpl {
    create(createCertificationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, file } = createCertificationDto;
            const isCertification = yield mongo_1.CertificationModel.findOne({
                title: createCertificationDto.title,
            });
            if (isCertification) {
                throw domain_1.CustomError.badRequest("Certification title already exists");
            }
            const data = { title: title, url: file };
            const certification = new mongo_1.CertificationModel(data);
            certification.save();
            return domain_1.CertificationEntity.fromObject(certification);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const certification = yield mongo_1.CertificationModel.findById(id);
            if (!certification) {
                throw domain_1.CustomError.notFound("Certification not found");
            }
            return domain_1.CertificationEntity.fromObject(certification);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const certifications = yield mongo_1.CertificationModel.find();
            if (!certifications) {
                throw domain_1.CustomError.notFound("Certifications not found");
            }
            return certifications.map(domain_1.CertificationEntity.fromObject);
        });
    }
    update(updateCertificationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateCertificationDto, updates = __rest(updateCertificationDto, ["id"]);
            yield this.get(id);
            const certification = yield mongo_1.CertificationModel.findByIdAndUpdate(id, updates, {
                new: true,
            });
            if (!certification)
                throw domain_1.CustomError.internalServer("Internal Server Error");
            return domain_1.CertificationEntity.fromObject(certification);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get(id);
            const certification = yield mongo_1.CertificationModel.findByIdAndDelete(id);
            if (!certification)
                throw domain_1.CustomError.internalServer("Internal Server Error");
            return domain_1.CertificationEntity.fromObject(certification);
        });
    }
}
exports.CertificationDatasourceImpl = CertificationDatasourceImpl;
