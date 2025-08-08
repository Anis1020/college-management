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
const schemaModel_1 = require("../modules/user/schemaModel");
const superUser = {
    id: "0001",
    email: "herpowerbd@gmail.com",
    password: "superAdmin",
    needPasswordChange: false,
    role: "super-admin",
    status: "in-progress",
    isDeleted: false,
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield schemaModel_1.UserModel.findOne({ role: "super-admin" });
    if (!isAdminExist) {
        yield schemaModel_1.UserModel.create(superUser);
    }
});
exports.default = seedSuperAdmin;
