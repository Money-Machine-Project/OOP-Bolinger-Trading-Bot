class Strategy {
    static getInstance() { }
}
export class NPusStrategy extends Strategy {
    static instance;
    exe() {
        console.log("NPlus 전략 시작");
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
    exe() {
        console.log("UPDOWN 전략 시작");
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownStrategy();
        }
        return this.instance;
    }
}
