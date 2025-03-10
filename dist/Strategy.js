import { CutFilter, DefaultFilter, NoTradeFilter, TradingFilter, } from "./filter/index.js";
import AccessToken from "./api/core/AccessToken.js";
class Strategy {
    static getInstance() { }
}
export class NPusStrategy extends Strategy {
    static instance;
    async exe() {
        console.log("NPlus 전략 시작");
        const aa = new AccessToken.Builder().build();
        console.log(await aa.handle());
        const df = new DefaultFilter();
        let filter = df;
        if (false) {
            const ntf = new NoTradeFilter();
            filter = filter.setNext(ntf);
        }
        if (false) {
            const cf = new CutFilter();
            filter = filter.setNext(cf);
        }
        if (true) {
            const tf = new TradingFilter();
            filter = filter.setNext(tf);
        }
        await df.handle();
    }
    static getInstance() {
        if (!this.instance) {
            return new NPusStrategy();
        }
        return this.instance;
    }
}
export class UpDownStrategy extends Strategy {
    static instance;
    async exe() {
        console.log("UPDOWN 전략 시작");
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownStrategy();
        }
        return this.instance;
    }
}
