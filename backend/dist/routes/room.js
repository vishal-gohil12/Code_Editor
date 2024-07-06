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
exports.roomRoute = void 0;
const express_1 = require("express");
const child_process_1 = require("child_process");
exports.roomRoute = (0, express_1.Router)();
exports.roomRoute.post('/execute', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const safeCode = code.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    (0, child_process_1.exec)(`node -e "${safeCode}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ output: stderr });
        }
        console.log(stdout);
        res.json({ output: stdout });
    });
}));
