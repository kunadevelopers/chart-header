declare global {
    namespace mobx {

        interface IKCHSStore {
            baseAsset?: string
            quoteAsset?: string;

            lastPrice?: number;
            usdRate?: number;

            high?: number;
            low?: number;

            change24h?: number;
            volume24h?: number;

            /**
             * @default 2
             */
            pricePrecision: number;

            /**
             * @default 0
             */
            volumePrecision: number;
        }
    }
}

export {};
