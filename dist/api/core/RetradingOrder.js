import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";
class RetradingOrder extends OpenApi {
    accessToken;
    orderId;
    tradingType;
    orderType;
    count;
    price;
    constructor(accessToken, orderId, tradingType, orderType, count, price) {
        super();
        this.accessToken = accessToken;
        this.orderId = orderId;
        this.tradingType = tradingType;
        this.orderType = orderType;
        this.count = count;
        this.price = price;
    }
    async handle() {
        console.log("RetradingOrder Start");
        const uri = "/uapi/domestic-stock/v1/trading/order-rvsecncl";
        const trId = config.status === "virtual" ? "TTTC0013U" : "TTTC0013U";
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.accessToken}`,
            appkey: config.appkey,
            appsecret: config.appsecret,
            tr_id: trId, // 모의투자용
        };
        const body = {
            CANO: config.frontAccount,
            ACNT_PRDT_CD: config.backAccount,
            KRX_FWDG_ORD_ORGNO: "",
            ORGN_ODNO: this.orderId,
            ORD_DVSN: this.tradingType,
            RVSE_CNCL_DVSN_CD: this.orderType,
            ORD_QTY: this.count,
            ORD_UNPR: this.price,
            QTY_ALL_ORD_YN: "Y",
        };
        const response = await axios.post(`${config.baseUrl}${uri}`, body, {
            headers,
        });
        return response.data;
    }
    static Builder = class RetradingOrderBuilder extends OpenApiBuilder {
        openApi;
        constructor(accessToken, orderId, tradingType, orderType, count, price) {
            super();
            this.openApi = new RetradingOrder(accessToken, orderId, tradingType, orderType, count, price);
        }
    };
}
export default RetradingOrder;
