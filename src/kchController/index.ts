import { Pusher } from 'pusher-js';
import { observable, computed, set, action, runInAction } from 'mobx';

export type KCHOption = {
    symbol?: string;
    baseAsset?: string;
    quoteAsset?: string;
    change24h?: number;

    lastPrice?: number;
    usdRate?: number;

    high?: number;
    low?: number;

    pricePrecision?: number;
    volumePrecision?: number;

    volume24h?: number;
};

export default class KCHController implements mobx.IKCHSStore {
    protected pusher?: Pusher;

    @observable
    public symbol?: string;

    @observable
    public baseAsset?: string;

    @observable
    public quoteAsset?: string;

    @observable
    public lastPrice?: number;

    @observable
    public usdRate?: number;

    @observable
    public high?: number;

    @observable
    public low?: number;

    @observable
    public change24h?: number;

    @observable
    public volume24h?: number;

    @observable
    public pricePrecision: number = 2;

    @observable
    public volumePrecision: number = 0;

    public constructor(option: KCHOption) {
        set(this, option);

        if ('pusher' in window) {
            this.pusher = (window as any).pusher;
            this.startTracking();
        }
    }

    @computed
    public get isPositive(): boolean {
        return this.change24h > 0;
    }

    @action
    public setData(option: KCHOption): void {
        if (option.lastPrice && !option.high) {
            if (!this.high || option.lastPrice > this.high) {
                this.high = option.lastPrice;
            }
        }

        if (option.lastPrice && !option.low) {
            if (!this.low || option.lastPrice < this.low) {
                this.low = option.lastPrice;
            }
        }

        set(this, option);
    }

    @action
    protected handleTickers(tickers: Record<string, any>) {
        if (!this.symbol) {
            return;
        }

        const ticker = tickers[this.symbol];
        const lastPrice = +ticker.last;
        const openPrice = +ticker.open;

        runInAction(() => {
            this.volume24h = +ticker.volume;

            this.low = +ticker.low;
            this.high = +ticker.high;

            this.lastPrice = lastPrice;

            if (openPrice && openPrice > 0) {
                this.change24h = (lastPrice - openPrice) / openPrice;
            }
        });
    }

    protected startTracking() {
        if (!this.pusher) {
            return;
        }

        const channelName = ['market', 'global'].join('-');
        const event = 'tickers';

        let globalChannel = this.pusher.channel(channelName);
        if (!globalChannel) {
            globalChannel = this.pusher.subscribe(channelName);
        }

        globalChannel.bind(event, this.handleTickers.bind(this));
    }
}
