"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkOrigin;
const allowedOrigins = process.env.FRONTEND_URLS?.split(',') || (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);
function checkOrigin(req, res, next) {
    const origin = req.get('origin') || req.get('referer') || '';
    const originHost = origin.split('/').slice(0, 3).join('/');
    if (!originHost) {
        res.status(403).json({ error: 'Forbidden: missing origin' });
        return;
    }
    if (!allowedOrigins.includes(originHost)) {
        res.status(403).json({ error: 'Forbidden: origin not allowed' });
        return;
    }
    next();
}
//# sourceMappingURL=checkOrigin.js.map