import schedule from "node-schedule";
import { redisStatusCheck } from "../util/serverStatusCheck.js";
import { getArray, getValue, setArray } from "../db/redisManager.js";
import StockTimeSeriesPrice from "../api/core/StockTimeSeriesPrice.js";
import config from "../config/config.js";

const minuteCandleResetScheduler = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1, 2, 3, 4, 5]; // 월~금
  rule.hour = new schedule.Range(9, 15);
  rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 5의 배수 분과 0분 포함
  rule.tz = "Asia/Seoul"; // 한국 시간대 설정

  schedule.scheduleJob(rule, async function () {
    await redisStatusCheck();
    const accessToken = await getValue("accessToken");
    const now = new Date();
    if (now.getHours() === 15 && now.getMinutes() > 30) {
      return;
    }
    // 9시에는 0분에 실행하지 않음
    if (now.getHours() === 9 && now.getMinutes() === 0) {
      return;
    }
    let inverseStockData = await getArray("inverseStockPrice");
    inverseStockData.shift();

    const object = new StockTimeSeriesPrice.Builder(
      accessToken,
      config.symbolInverse as string
    ).build();
    const inverseCurrentData = await object.handle();
    inverseStockData.push(inverseCurrentData.stck_prpr);
    await setArray("inverseStockPrice", inverseStockData);
    console.log("5분봉 세팅 완료");
  });
  console.log(
    "5분봉 데이터 초기화 스케줄러가 설정되었습니다. 월-금 매시간 5분 간격으로 실행되며, 10시에는 5분부터 시작합니다."
  );
};

export default minuteCandleResetScheduler;
