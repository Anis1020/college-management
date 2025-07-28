"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const globalError_1 = __importDefault(require("./app/modules/errors/globalError"));
const notFount_1 = __importDefault(require("./app/modules/errors/notFount"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", router_1.default);
//global error handler
app.use(globalError_1.default);
//not fount route
app.use(notFount_1.default);
exports.default = app;
