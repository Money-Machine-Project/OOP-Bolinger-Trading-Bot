import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";

class TradingSettlementDetail extends OpenApi {
  private today: string;
  private accessToken: string;
  private symbol: string;
  private type: string;
  private tradeComplete: string;
  private orderId?: string = "";
  private ctxAreaFK100?: string = "";
  private ctxAreaNk100?: string = "";

  constructor(
    today: string,
    accessToken: string,
    symbol: string,
    type: string,
    tradingComplete: string,
    orderId?: string,
    ctxAreaFK100?: string,
    ctxAreaNk100?: string
  ) {
    super();
    this.today = today;
    this.accessToken = accessToken;
    this.symbol = symbol;
    this.type = type;
    this.tradeComplete = tradingComplete;
    this.orderId = orderId;
    this.ctxAreaFK100 = ctxAreaFK100;
    this.ctxAreaNk100 = ctxAreaNk100;
  }
  override async handle() {
    console.log("TradingSettlementDetail Start");
    const uri = "/uapi/domestic-stock/v1/trading/inquire-daily-ccld";
    const trId = config.status === "virtual" ? "VTTC8001R" : "TTTC0081R";

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${this.accessToken}`,
      appkey: config.appkey,
      appsecret: config.appsecret,
      tr_id: trId, // 모의투자용
    };

    const params = {
      CANO: config.frontAccount,
      ACNT_PRDT_CD: config.backAccount,
      INQR_STRT_DT: this.today,
      INQR_END_DT: this.today,
      SLL_BUY_DVSN_CD: this.type,
      INQR_DVSN: "00",
      PDNO: this.symbol,
      CCLD_DVSN: this.tradeComplete,
      ORD_GNO_BRNO: "",
      ODNO: this.orderId,
      INQR_DVSN_3: "00",
      INQR_DVSN_1: "",
      CTX_AREA_FK100: this.ctxAreaFK100,
      CTX_AREA_NK100: this.ctxAreaNk100,
    };

    const response = await axios.get(`${config.baseUrl}${uri}`, {
      headers,
      params,
    });
    // console.log(response.data);
    return {
      output: response.data.output1,
      ctx_area_fk100: response.data.ctx_area_fk100,
      ctx_area_nk100: response.data.ctx_area_nk100,
    };
  }

  static Builder = class TradingSettlementDetailBuilder extends OpenApiBuilder {
    override openApi: TradingSettlementDetail;
    constructor(
      today: string,
      accessToken: string,
      symbol: string,
      type: string,
      tradingComplete: string
    ) {
      super();
      this.openApi = new TradingSettlementDetail(
        today,
        accessToken,
        symbol,
        type,
        tradingComplete
      );
    }

    setOrderId(orderId: string) {
      this.openApi.orderId = orderId;
      return this;
    }

    setCtxAreaFK100(ctxAreaFK100: string) {
      this.openApi.ctxAreaFK100 = ctxAreaFK100;
      return this;
    }

    setCtxAreaNk100(ctxAreaNk100: string) {
      this.openApi.ctxAreaNk100 = ctxAreaNk100;
      return this;
    }
  };
}

export default TradingSettlementDetail;
