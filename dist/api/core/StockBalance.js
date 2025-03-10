import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";
class StockBalance extends OpenApi {
    accessToken;
    constructor(accessToken) {
        super();
        this.accessToken = accessToken;
    }
    async handle() {
        console.log("StockBalance Start");
        const uri = "/uapi/domestic-stock/v1/trading/inquire-balance";
        const trId = config.status === "virtual" ? "VTTC8434R" : "TTTC8434R";
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.accessToken}`,
            appkey: config.appkey,
            appsecret: config.appsecret,
            tr_id: trId, // 모의투자용 TR ID
        };
        const params = {
            CANO: config.frontAccount, // 계좌번호 앞 8자리
            ACNT_PRDT_CD: config.backAccount, // 계좌번호 뒤 2자리
            AFHR_FLPR_YN: "N", // 시간외단일가여부
            OFL_YN: "N", // 오프라인여부
            INQR_DVSN: "02", // 조회구분 (01:대출일별, 02:종목별)
            UNPR_DVSN: "01", // 단가구분 (01:기본값)
            FUND_STTL_ICLD_YN: "N", // 펀드결제분포함여부
            FNCG_AMT_AUTO_RDPT_YN: "N", // 융자금액자동상환여부
            PRCS_DVSN: "00", // 처리구분 (00:전체)
            CTX_AREA_FK100: "", // 연속조회검색조건
            CTX_AREA_NK100: "", // 연속조회키
        };
        const response = await axios.get(`${config.baseUrl}${uri}`, {
            headers,
            params,
        });
        return response.data; // 주식 잔고 정보 반환
    }
    static Builder = class StockBalanceBuilder extends OpenApiBuilder {
        openApi;
        constructor(accessToken) {
            super();
            this.openApi = new StockBalance(accessToken);
        }
    };
}
export default StockBalance;
