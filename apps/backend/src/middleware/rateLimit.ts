import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 min
  max: 1,                 // max request 
  message: {
    error: "Too many attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
