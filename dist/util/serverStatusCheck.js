import { deleteValue, getValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
const redisStatusCheck = async () => {
    const cacheStatus = await getValue("status");
    if (cacheStatus === null) {
        await sendMail("REDIS_ERROR", {});
        process.exit(0);
    }
};
const exitServer = async (count) => {
    if (count >= 5) {
        await deleteValue("count");
        await sendMail("SEQUENCE_ERROR", {});
        process.exit(0);
    }
};
export { redisStatusCheck, exitServer };
