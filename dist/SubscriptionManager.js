import { getArray, setArray } from "./db/redisManager.js";
export class SubscriptionManager {
    listeners = {};
    static instance;
    constructor() { }
    async addEvent(event) {
        const aEvent = await getArray(event);
        if (!aEvent) {
            await setArray(event, []);
        }
    }
    async subscribe(event, v) {
        const aEvent = await getArray(event);
        aEvent.push(v);
        await setArray(event, aEvent);
    }
    publish(event) {
        // this.listeners[event].forEach((target) => {
        //   target.publish(event);
        // });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }
}
