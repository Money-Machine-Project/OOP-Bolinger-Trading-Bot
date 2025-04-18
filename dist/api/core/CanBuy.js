import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";
class CanBuy extends OpenApi {
    symbol;
    unpr;
    dvsn;
    evluAmtIcld;
    icld;
    constructor(accessToken, symbol, unpr, dvsn, evluAmtIcld, icld) {
        super(accessToken);
        this.accessToken = accessToken;
        this.symbol = symbol;
        this.unpr = unpr;
        this.dvsn = dvsn;
        this.evluAmtIcld = evluAmtIcld;
        this.icld = icld;
    }
    async handle() {
        console.log("canBuy Start");
        const uri = "/uapi/domestic-stock/v1/trading/inquire-psbl-order";
        const trId = config.status === "virtual" ? "VTTC8908R" : "TTTC8908R";
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.accessToken}`,
            appkey: config.appkey,
            appsecret: config.appsecret,
            tr_id: trId,
        };
        const params = {
            CANO: config.frontAccount,
            ACNT_PRDT_CD: config.backAccount,
            PDNO: this.symbol,
            ORD_UNPR: this.unpr,
            ORD_DVSN: this.dvsn,
            CMA_EVLU_AMT_ICLD_YN: this.evluAmtIcld,
            OVRS_ICLD_YN: this.icld,
        };
        const response = await axios.get(`${config.baseUrl}${uri}`, {
            headers,
            params,
        });
        return response.data.output;
    }
    static Builder = class CanBuyBuilder extends OpenApiBuilder {
        openApi;
        constructor(accessToken, symbol, unpr, dvsn, evluAmtIcld, icld) {
            super();
            this.openApi = new CanBuy(accessToken, symbol, unpr, dvsn, evluAmtIcld, icld);
        }
    };
}
export default CanBuy;
