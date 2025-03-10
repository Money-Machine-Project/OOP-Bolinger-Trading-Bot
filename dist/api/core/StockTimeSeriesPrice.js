import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";
class StockTimeSeriesPrice extends OpenApi {
    accessToken;
    symbol;
    constructor(accessToken, symbol) {
        super();
        this.accessToken = accessToken;
        this.symbol = symbol;
    }
    async handle() {
        console.log("StockTimeSeriesPrice Start");
        const path = "/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice";
        const trId = config.status === "virtual" ? "FHKST03010200" : "FHKST03010200";
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const dateStr = `${year}${month}${day}`;
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.accessToken}`,
            appkey: config.appkey,
            appsecret: config.appsecret,
            tr_id: trId,
        };
        const params = {
            FID_ETC_CLS_CODE: "",
            FID_COND_MRKT_DIV_CODE: "J",
            FID_INPUT_ISCD: this.symbol,
            FID_INPUT_HOUR_1: "5", // 5분봉
            FID_PW_DATA_INCU_YN: "Y", // 당일 데이터 포함
            FID_INPUT_DATE_1: dateStr, // 오늘 날짜 YYYYMMDD 형식
        };
        const response = await axios.get(`${config.baseUrl}${path}`, {
            headers,
            params,
        });
        return response.data.output1;
    }
    static Builder = class StockTimeSeriesPriceBuilder extends OpenApiBuilder {
        openApi;
        constructor(accessToken, symbol) {
            super();
            this.openApi = new StockTimeSeriesPrice(accessToken, symbol);
        }
    };
}
export default StockTimeSeriesPrice;
