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
exports.SemesterModel = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("./constant");
const semesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: constant_1.SemesterNames,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: constant_1.SemesterCodes,
    },
    startMonth: {
        type: String,
        required: true,
        enum: constant_1.SemesterMonths,
    },
    endMonth: {
        type: String,
        required: true,
        enum: constant_1.SemesterMonths,
    },
}, {
    timestamps: true,
});
semesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExist = yield exports.SemesterModel.findOne({
            year: this.year,
            name: this.name,
        });
        if (isSemesterExist) {
            throw new Error("Semester is already exist");
        }
        next();
    });
});
exports.SemesterModel = (0, mongoose_1.model)("Semester", semesterSchema);
