import React from 'react';
import BigNumber from 'bignumber.js';
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

        const { pricePrecision, volumePrecision } = kchStore;

        const change24 = new BigNumber(kchStore.change24h);
        const volume = new BigNumber(kchStore.volume24h);

        const direction = change24.gt(0) ? 'up' : 'down';

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
                        pricePrecision={pricePrecision}
                        usdRate={kchStore.usdRate}
                        direction={direction}
                    />
                </div>

                <div className="kch-unit-section">
                    <Unit title="Change" valueDirection={direction}>
                        {typeof kchStore.change24h !== 'undefined'
                            ? change24.times(100).toFormat(2) + '%'
                            : '---'
                        }
                    </Unit>

                    <Unit title="High">
                        {kchStore.high
                            ? new BigNumber(kchStore.high).toFormat(
                                pricePrecision)
                            : '---'
                        }
                    </Unit>

                    <Unit title="Low">
                        {kchStore.low
                            ? new BigNumber(kchStore.low).toFormat(
                                pricePrecision)
                            : '---'
                        }
                    </Unit>

                    <Unit title="24H Volume">
                        {
                            volume.gt(0)
                                ? `${volume.toFormat(
                                volumePrecision)} ${kchStore.baseAsset}`
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
