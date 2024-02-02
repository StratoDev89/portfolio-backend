"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDAdapter = void 0;
const uuid_1 = require("uuid");
class UUIDAdapter {
    static v4() {
        return (0, uuid_1.v4)();
    }
}
exports.UUIDAdapter = UUIDAdapter;
