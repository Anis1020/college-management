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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schemaModel_1 = require("../user/schemaModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("./utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the user is exist
    const user = yield schemaModel_1.UserModel.isUserExistsByCustomId(payload.id);
    //   console.log(user);
    if (!user) {
        throw new AppError_1.default(400, "this user is not exist");
    }
    //is user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(404, "this user already deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(403, "this user is blocked");
    }
    if (!(yield schemaModel_1.UserModel.isUserPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(400, "password in incorrect");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    //create access token
    const accessToken = (0, utils_1.createToken)(jwtPayload, config_1.config.jwt_access_secret, "10m");
    //create refresh token
    const refreshToken = (0, utils_1.createToken)(jwtPayload, config_1.config.jwt_refresh_secret, "30d");
    return {
        accessToken,
        refreshToken,
        needPasswordChange: user === null || user === void 0 ? void 0 : user.needPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemaModel_1.UserModel.isUserExistsByCustomId(userData.userId);
    //   console.log(user);
    if (!user) {
        throw new AppError_1.default(400, "this user is not exist");
    }
    //is user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(404, "this user already deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(403, "this user is blocked");
    }
    if (!(yield schemaModel_1.UserModel.isUserPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(400, "password in incorrect");
    }
    const newHshPass = yield bcryptjs_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.config.bcrypt_salt));
    yield schemaModel_1.UserModel.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHshPass,
        needPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //check is the token  is valid
    const decoded = (0, utils_1.verifyToken)(token, config_1.config.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = yield schemaModel_1.UserModel.isUserExistsByCustomId(userId);
    //   console.log(user);
    if (!user) {
        throw new AppError_1.default(400, "this user is not exist");
    }
    //is user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(404, "this user already deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(403, "this user is blocked");
    }
    if (user.passwordChangeAt &&
        schemaModel_1.UserModel.isJWTIssuedBeforePassChange(user.passwordChangeAt, iat)) {
        throw new AppError_1.default(404, "invalid password");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    //create access token
    const accessToken = (0, utils_1.createToken)(jwtPayload, config_1.config.jwt_access_secret, "10m");
    return { accessToken };
});
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemaModel_1.UserModel.isUserExistsByCustomId(userId);
    //   console.log(user);
    if (!user) {
        throw new AppError_1.default(400, "this user is not exist");
    }
    //is user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(404, "this user already deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(403, "this user is blocked");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    //create access token
    const resetToken = (0, utils_1.createToken)(jwtPayload, config_1.config.jwt_access_secret, "10m");
    const resetUILink = `${config_1.config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
    // sendEmail(user?.email, resetUILink);
    console.log(resetUILink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemaModel_1.UserModel.isUserExistsByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    //   console.log(user);
    if (!user) {
        throw new AppError_1.default(400, "this user is not exist");
    }
    //is user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(404, "this user already deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(403, "this user is blocked");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_access_secret);
    if (payload.id !== decoded.userId) {
        throw new AppError_1.default(401, "you are forbidden");
    }
    //hash password
    const newHashPass = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.config.bcrypt_salt));
    yield schemaModel_1.UserModel.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role,
    }, {
        password: newHashPass,
        needPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    console.log(decoded);
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
