"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    if (!jwt_1.secret) {
        res.status(500).json({ error: 'JWT secret not configured' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.secret);
        if (typeof decoded !== 'object' || !decoded.id || !decoded.username) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        req.user = { id: String(decoded.id), username: String(decoded.username) };
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map