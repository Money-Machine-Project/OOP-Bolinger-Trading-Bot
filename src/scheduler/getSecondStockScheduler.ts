import cron from "node-cron";
import { getValue } from "../db/redisManager.js";
import { redisStatusCheck } from "../util/serverStatusCheck.js";
import main from "../main.js";
import config from "../config/config.js";
import StockTimeSeriesPrice from "../api/core/StockTimeSeriesPrice.js";

const getSecondStockScheduler = async () => {
  cron.schedule("*/2 * 9-14 * * 1-5", async function () {
    try {
      const accessToken = await getValue("accessToken");
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 9시 30분 이후에만 실행
      if (hours > 9 || (hours === 9 && minutes >= 30)) {
        await redisStatusCheck();
        //   await sleep(2000);

        const object = new StockTimeSeriesPrice.Builder(
          accessToken,
          config.symbolInverse as string
        ).build();
        const inverseStockData = await object.handle();
        await main(inverseStockData.stck_prpr, accessToken);
      }
    } catch (error) {
      console.error("스케줄러 실행 중 오류 발생:", error);
    }
  });
  console.log(
    "초 단위 주가 조회 스케줄러가 설정되었습니다. 월-금 9:30부터 14:59까지 4초마다 실행됩니다."
  );
};

export default getSecondStockScheduler;
