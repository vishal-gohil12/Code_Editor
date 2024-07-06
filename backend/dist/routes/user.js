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
exports.userRoute = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.userRoute = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const secret = process.env.SECRET || "default_secret_key";
exports.userRoute.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const hashPass = yield bcrypt_1.default.hash(password, 10);
        const User = yield prisma.user.create({
            data: {
                email: email,
                password: hashPass
            }
        });
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (E) {
        res.json({
            Error: "Error occure try again later"
        });
    }
}));
exports.userRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const userPass = (user === null || user === void 0 ? void 0 : user.password) || "";
        const isMatch = yield bcrypt_1.default.compare(password, userPass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful' });
    }
    catch (E) {
        res.json({
            Error: "Error occure try again later"
        });
    }
}));
