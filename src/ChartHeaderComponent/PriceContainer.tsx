import React from 'react';
import cn from 'classnames';
import BigNumber from 'bignumber.js';

type PriceProps = {
    lastPrice: number;
    usdRate?: number;
    pricePrecision?: number;
    direction: 'up' | 'down';
};

export default function PriceContainer(props: PriceProps): JSX.Element {
    const { lastPrice, usdRate, pricePrecision = 2, direction } = props;
    const price = new BigNumber(lastPrice);

    if (price.lte(0)) {
        return <div>---</div>;
    }

    const priceClasses = [
        'kch-price-value',
        direction === 'up' ? 'kch-value-up' : 'kch-value-down',
    ];

    return (
        <div className="kch-price">
            <span className={cn(priceClasses)}>
                {price.toFormat(pricePrecision)}
            </span>
            {usdRate > 0 ? (
                <span className="kch-price-estimate">
                    ≈ {price.times(usdRate).toFormat(2)} USD
                </span>
            ) : undefined}
        </div>
    );
}
