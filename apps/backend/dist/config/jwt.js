"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiresIn = exports.secret = void 0;
const secretEnv = process.env.JWT_SECRET_CODE;
const expiresIn = process.env.JWT_EXPIRE_TIME || '1d';
exports.expiresIn = expiresIn;
if (!secretEnv) {
    throw new Error('Missing required environment variable: JWT_SECRET_CODE');
}
const secret = secretEnv;
exports.secret = secret;
//# sourceMappingURL=jwt.js.map