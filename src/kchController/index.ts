import { observable, set, action } from 'mobx';

export type KCHOption = {
    baseAsset?: string;
    quoteAsset?: string;
    change24h?: number;

    lastPrice?: number;
    usdRate?: number;

    high?: number;
    low?: number;

    pricePrecision?: number;
    volumePrecision?: number;
};

export default class KCHController implements mobx.IKCHSStore {
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
    public pricePrecision: number = 2;

    @observable
    public volumePrecision: number = 0;

    public constructor(option: KCHOption) {
        set(this, option);
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
}
