import React from 'react';
import cn from 'classnames';
import numeral from 'numeral';

type PriceProps = {
    lastPrice: number;
    usdRate?: number;
    priceFormat?: string;
    direction: 'up' | 'down';
};

const usdFormat = '0,0.[00]';

export default function PriceContainer(props: PriceProps): JSX.Element {
    const { lastPrice, usdRate, priceFormat = '0,0.[00]', direction } = props;
    const price = numeral(lastPrice || 0);

    if (price.value() <= 0) {
        return <div>---</div>;
    }

    const priceClasses = [
        'kch-price-value',
        direction === 'up' ? 'kch-value-up' : 'kch-value-down',
    ];

    return (
        <div className="kch-price">
            <span className={cn(priceClasses)}>
                {price.format(priceFormat)}
            </span>
            {usdRate > 0 ? (
                <span className="kch-price-estimate">
                    ≈ {price.multiply(usdRate).format(usdFormat)} USD
                </span>
            ) : undefined}
        </div>
    );
}
