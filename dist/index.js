"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// import AuthRouter from './routes/authRoute';
const dataSource_1 = require("./dataSource");
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(userRoute_1.default);
// app.use(AuthRouter);
dataSource_1.AppDataSource.connect()
    .then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on ${process.env.NODE_ENV}  port ${process.env.PORT || 3000}`);
    });
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map