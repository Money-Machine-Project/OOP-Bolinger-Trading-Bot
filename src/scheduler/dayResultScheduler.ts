import schedule from "node-schedule";
import { getValue } from "../db/redisManager.js";
import retryOperation from "../util/retryOperation.js";
import getKoreaDate from "../util/getKoreaDate.js";
import { resultInsert } from "../db/insert.js";
import { redisStatusCheck } from "../util/serverStatusCheck.js";
import sendMail from "../mail/sendMail.js";
import StockBalance from "../api/core/StockBalance.js";

/**
 * 당일 거래 결과 수집 스케줄러
 * @param {string} accessToken 접근 토큰
 * @param {string} symbol 종목명
 * @param {string} symbolInverse 인버스 종목명
 */
const dayResultScheduler = (symbol: string, symbolInverse: string) => {
  schedule.scheduleJob("40 15 * * 1-5", async function () {
    try {
      const accessToken = await getValue("accessToken");
      await retryOperation(
        async () => {
          await redisStatusCheck();
          const today = getKoreaDate();
          const object = new StockBalance.Builder(accessToken).build();
          const todayBalance = await object.handle();
          await sendMail("TRADING_RESULT", {
            beforePrice: todayBalance.output2[0].bfdy_tot_asst_evlu_amt,
            afterPrice: todayBalance.output2[0].tot_evlu_amt,
            result: Number(todayBalance.output2[0].asst_icdc_erng_rt).toFixed(
              2
            ),
          });
          await resultInsert(
            today,
            Number(todayBalance.output2[0].tot_evlu_amt),
            todayBalance.output2[0].asst_icdc_erng_rt.toFixed(2)
          );
        },
        3,
        1000
      ); // 최대 3번 재시도, 5초 간격
    } catch (error) {
      console.error("거래 결과 수집 실패:", error);
    }
  });
  console.log("거래 결과 스케줄러가 설정되었습니다. 월-금 15:40에 실행됩니다.");
};

export default dayResultScheduler;
