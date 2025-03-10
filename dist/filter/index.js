export class Filter {
    next;
    setNext(filter) {
        this.next = filter;
        return filter;
    }
}
export class DefaultFilter extends Filter {
    async handle() {
        if (this.next) {
            await this.next.handle();
        }
    }
}
export class NoTradeFilter extends Filter {
    async handle() {
        if (this.next) {
            await this.next.handle();
        }
    }
}
export class CutFilter extends Filter {
    async handle() {
        if (this.next) {
            await this.next.handle();
        }
    }
}
export class TradingFilter extends Filter {
    async handle() {
        if (this.next) {
            await this.next.handle();
        }
    }
}
