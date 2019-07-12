import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import PriceContainer from './PriceContainer';
import Unit from './Unit';

type MainComponentProps = {
    kchStore: mobx.IKCHSStore
};

class MainComponent extends React.Component<MainComponentProps> {
    public render(): JSX.Element {
        const { kchStore } = this.props;

        const priceFormat = `0,0[${'0'.repeat(kchStore.pricePrecision)}]`;
        const volumeFormat = `0,0.[${'0'.repeat(kchStore.volumePrecision)}]`;
        const direction = kchStore.change24h > 0 ? 'up' : 'down';

        return (
            <div className="kch-body">
                <div className="kch-symbol-section">
                    <div className="kch-symbol">
                        <span>{kchStore.baseAsset || '---'}</span>
                        <span>/</span>
                        <span>{kchStore.quoteAsset || '---'}</span>
                    </div>

                    <PriceContainer
                        lastPrice={kchStore.lastPrice || 0}
                        priceFormat={priceFormat}
                        usdRate={kchStore.usdRate}
                        direction={direction}
                    />
                </div>

                <div className="kch-unit-section">
                    <Unit title="Change" valueDirection={direction}>
                        {kchStore.change24h
                            ? numeral(kchStore.change24h).format('+0.[00]%')
                            : '---'
                        }
                    </Unit>

                    <Unit title="High">
                        {kchStore.high
                            ? numeral(kchStore.high).format(priceFormat)
                            : '---'
                        }
                    </Unit>

                    <Unit title="Low">
                        {kchStore.low
                            ? numeral(kchStore.low).format(priceFormat)
                            : '---'
                        }
                    </Unit>

                    <Unit title="24H Volume">
                        {
                            kchStore.volume24h
                                ? `${numeral(kchStore.volume24h).
                                    format(volumeFormat)} ${kchStore.baseAsset}`
                                : '---'
                        }

                    </Unit>

                </div>
            </div>
        );
    }
}

export default compose<MainComponentProps, {}>(
    inject('kchStore') as Function,
    observer as Function,
)(MainComponent);