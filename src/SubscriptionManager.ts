import { setValue, getValue, getArray, setArray } from "./db/redisManager.js";

interface Listner {
  name: string;
  flag: string;
}

export class SubscriptionManager {
  listeners: {
    [key: string]: Listner[];
  } = {};
  private static instance: SubscriptionManager;
  private constructor() {}

  async addEvent(event: string) {
    const aEvent = await getArray(event);
    if (!aEvent) {
      await setArray(event, []);
    }
  }

  async subscribe(event: string, v: Listner): Promise<void> {
    const aEvent = await getArray(event);
    aEvent.push(v);
    await setArray(event, aEvent);
  }

  publish(event: string) {
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
