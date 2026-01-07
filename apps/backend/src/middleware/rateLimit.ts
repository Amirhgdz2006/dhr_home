import rateLimit from "express-rate-limit";

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "600000", 10);
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX ?? "3", 10);

export const authRateLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  message: {
    error: "Too many attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
