import schedule from "node-schedule";
import AccessToken from "../api/token/AccessToken.js";
import { setValue } from "../db/redisManager.js";
import { redisStatusCheck } from "../util/serverStatusCheck.js";
/**
 * 접근 토큰 초기화 스케줄러
 */
const accessTokenScheduler = async () => {
    schedule.scheduleJob("1 8 * * *", async function () {
        await redisStatusCheck();
        const object = new AccessToken.Builder().build();
        const newAccessToken = await object.handle();
        await setValue("accessToken", String(newAccessToken));
        console.log("새 엑세스 토큰 세팅 완료");
    });
    console.log("접근 토큰 초기화 스케줄러가 설정되었습니다. 월-금 00:00에 실행됩니다.");
};
export default accessTokenScheduler;
