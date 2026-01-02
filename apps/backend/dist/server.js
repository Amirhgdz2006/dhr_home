"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const api_1 = __importDefault(require("./routes/api"));
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
// CORS configuration
const allowedOrigins = process.env.FRONTEND_URLS?.split(',') || (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routers
app.use('/api', api_1.default);
app.use('/auth', auth_1.default);
// Static files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use('/background', express_1.default.static(path_1.default.join(__dirname, '..', 'background')));
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
    });
});
// Global Error Handler (must be last)
app.use(errorHandler_1.default);
const PORT = parseInt(process.env.PORT || '1338', 10);
// Connect to DB and start server
(0, db_1.default)()
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map