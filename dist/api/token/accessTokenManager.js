import { getValue, setExpire, setValue } from "../../db/redisManager.js";
import AccessToken from "./AccessToken.js";
const accessTokenManager = async () => {
    let accessToken = await getValue("accessToken");
    if (!accessToken) {
        accessToken = await new AccessToken.Builder().build().handle();
        await setValue("accessToken", String(accessToken));
        setExpire("accessToken", String(3600 * 12 * 2));
    }
};
export default accessTokenManager;
