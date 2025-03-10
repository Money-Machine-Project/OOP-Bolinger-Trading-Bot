import * as redis from "redis";
import dotenv from "dotenv";
dotenv.config();
const redisClient = redis.createClient({
    // aws  및 로컬
    url: `redis://${process.env.AWS_REDIS_ENDPOINT}:${process.env.AWS_REDIS_PORT}`,
    legacyMode: true,
});
const connectToRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    }
    catch (error) {
        setTimeout(() => {
            redisClient.quit(); // 현재 연결 종료
            redisClient.connect(); // 다시 연결 시도
        }, 3000);
        console.error("Error connecting to Redis:");
    }
};
export { redisClient, connectToRedis };
