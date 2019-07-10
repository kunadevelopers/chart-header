import { observable, set } from 'mobx';

export type KCHOption = {
    baseAsset?: string;
    quoteAsset?: string;
    lastPrice?: number;
};

export default class KCHController {
    @observable
    public baseAsset?: string;

    @observable
    public quoteAsset?: string;

    @observable
    public lastPrice?: number;

    public constructor(option: KCHOption) {
        set(this, option);
    }

}
