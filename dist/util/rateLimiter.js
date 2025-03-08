import rateLimit from "express-rate-limit";
const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
});
export default authLimiter;
