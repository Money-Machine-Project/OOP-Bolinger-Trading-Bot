import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";
import OpenApi from "../OpenApi.js";
class AccessToken extends OpenApi {
    async handle() {
        console.log("AccessToken Start");
        const path = "/oauth2/tokenP";
        const fullUrl = `${config.baseUrl}${path}`;
        const body = {
            grant_type: "client_credentials",
            appkey: config.appkey,
            appsecret: config.appsecret,
        };
        const response = await axios.post(fullUrl, body);
        return response.data.access_token;
    }
    static Builder = class AccessTokenBuilder extends OpenApiBuilder {
        openApi;
        constructor() {
            super();
            this.openApi = new AccessToken();
        }
    };
}
export default AccessToken;
