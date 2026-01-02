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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const security_1 = require("../utils/security");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
function createHttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}
const register = async ({ username, password }) => {
    if (!username || !password) {
        throw createHttpError(400, 'username and password are required');
    }
    const existing = await userRepository.findByUsername(username);
    if (existing) {
        throw createHttpError(409, 'username already exists');
    }
    const hashed = await (0, security_1.hashPassword)(password);
    return userRepository.create({ username, password: hashed });
};
exports.register = register;
const login = async ({ username, password }) => {
    if (!username || !password) {
        throw createHttpError(400, 'username and password are required');
    }
    const user = await userRepository.findByUsername(username);
    if (!user) {
        throw createHttpError(401, 'Invalid credentials');
    }
    const isMatch = await (0, security_1.verifyPassword)(password, user.password);
    if (!isMatch) {
        throw createHttpError(401, 'Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), username: user.username }, jwt_1.secret, { expiresIn: jwt_1.expiresIn });
    return {
        token,
        user: { id: user.id, username: user.username }
    };
};
exports.login = login;
//# sourceMappingURL=authService.js.map