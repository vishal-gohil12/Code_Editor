"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.userRoute);
app.get("/auth", (req, res) => {
    res.status(200).json({ message: "You have access to this protected route!" });
});
// const wss = new WebSocketServer({ server: httpServer});
// wss.on('connection', (ws)=>{
//     ws.on('error', console.error);
//     ws.on('message', function message(data, isBinary) {
//         console.log(data.toString());
//     });
//     ws.send("Hello from webSocket")
// })
