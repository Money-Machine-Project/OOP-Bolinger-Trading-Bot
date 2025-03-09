import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class StockBalance extends OpenApi {
  private accessToken: string;
  constructor(accessToken: string) {
    super();
    this.accessToken = accessToken;
  }
  override handle() {
    console.log("StockBalance Start");
  }

  static Builder = class StockBalanceBuilder extends OpenApiBuilder {
    override openApi: StockBalance;
    constructor(accessToken: string) {
      super();
      this.openApi = new StockBalance(accessToken);
    }
  };
}

export default StockBalance;
