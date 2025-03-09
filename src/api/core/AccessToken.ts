import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class AccessToken extends OpenApi {
  override handle() {
    console.log("AccessToken Start");
  }

  static Builder = class AccessTokenBuilder extends OpenApiBuilder {
    override openApi: AccessToken;
    constructor(accessToken: string) {
      super();
      this.openApi = new AccessToken();
    }
  };
}

export default AccessToken;
