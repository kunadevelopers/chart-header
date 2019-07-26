import { autorun } from 'mobx';
import BigNumber from 'bignumber.js';
import KCHController from '../kchController';

export default class ChartHeaderElement {
    protected rootElement: Element;
    protected store: KCHController;

    protected symbolNameBox: Element;
    protected symbolPriceBox: Element;

    protected changeUnit: Element;
    protected highUnit: Element;
    protected lowUnit: Element;
    protected volumeUnit: Element;

    public constructor(rootElement: Element, store: KCHController) {
        this.rootElement = rootElement;
        this.store = store;

        this._initBox();
        this._initListeners();
    }

    protected _initBox() {
        const body = document.createElement('div');
        body.className = 'kch-body';

        const symbolSection = document.createElement('div');
        symbolSection.className = 'kch-symbol-section';
        body.appendChild(symbolSection);
        symbolSection.appendChild(this._buildSymbolName());
        symbolSection.appendChild(this._buildSymbolPrice());

        const unitsSection = document.createElement('div');
        unitsSection.className = 'kch-unit-section';
        body.appendChild(unitsSection);

        unitsSection.appendChild(this.changeUnit = this._buildUnit('Change'));
        unitsSection.appendChild(this.highUnit = this._buildUnit('High'));
        unitsSection.appendChild(this.lowUnit = this._buildUnit('Low'));
        unitsSection.appendChild(this.volumeUnit = this._buildUnit('24H Volume'));

        this.rootElement.appendChild(body);
    }

    public setUnitValue(unit: Element, value: string, direction?: 'up' | 'down'): void {
        const valueBox = unit.querySelector('.kch-unit-value');
        valueBox.innerHTML = value;

        valueBox.classList.remove('kch-value-up');
        valueBox.classList.remove('kch-value-down');

        if (direction) {
            valueBox.classList.add(direction === 'up' ? 'kch-value-up' : 'kch-value-down');
        }
    }

    protected _buildSymbolName() {
        this.symbolNameBox = document.createElement('div');
        this.symbolNameBox.className = 'kch-symbol';
        this.symbolNameBox.innerHTML = '---/---';

        return this.symbolNameBox;
    }

    protected _buildSymbolPrice() {
        this.symbolPriceBox = document.createElement('div');
        this.symbolPriceBox.className = 'kch-price';

        const price = document.createElement('span');
        price.className = 'kch-price-value';
        this.symbolPriceBox.appendChild(price);

        const priceEstimate = document.createElement('span');
        priceEstimate.className = 'kch-price-estimate';
        this.symbolPriceBox.appendChild(priceEstimate);

        return this.symbolPriceBox;
    }

    protected _buildUnit(label: string): Element {
        const unit = document.createElement('dl');
        unit.className = 'kch-unit';

        const unitTitle = document.createElement('dt');
        unitTitle.className = 'kch-unit-title';
        unitTitle.innerText = label;
        unit.appendChild(unitTitle);

        const unitValue = document.createElement('dd');
        unitValue.className = 'kch-unit-value';
        unitValue.innerText = '---';
        unit.appendChild(unitValue);

        return unit;
    }

    protected _initListeners() {
        // Symbol name Listener
        autorun(() => {
            this.symbolNameBox.innerHTML = [
                this.store.baseAsset ? this.store.baseAsset.toUpperCase() : '---',
                this.store.quoteAsset ? this.store.quoteAsset.toUpperCase() : '---',
            ].join('/');
        });

        // Price Listener
        autorun(() => {
            const priceBox = this.symbolPriceBox.querySelector('.kch-price-value');
            const priceEstimateBox = this.symbolPriceBox.querySelector('.kch-price-estimate');

            const newPriceClasses = ['kch-price-value'];

            const price = new BigNumber(this.store.lastPrice);
            if (price.isZero() || price.isNaN()) {
                priceBox.innerHTML = '---';
                priceEstimateBox.innerHTML = '';
            } else {
                const pricePrecision = this.store.pricePrecision === undefined ? 2 : this.store.pricePrecision;
                priceBox.innerHTML = price.toFormat(pricePrecision);
                newPriceClasses.push(this.store.isPositive ? 'kch-value-up' : 'kch-value-down');

                const usdPrice = price.times(this.store.usdRate);
                priceEstimateBox.innerHTML = `≈ ${usdPrice.toFormat(2)} USD`;
            }

            priceBox.className = newPriceClasses.join(' ');
        });

        // Change 24H Listener
        autorun(() => {
            if (typeof this.store.change24h === 'undefined') {
                this.setUnitValue(this.changeUnit, '---');

                return;
            }

            const change24 = new BigNumber(this.store.change24h).times(100);
            const prefix = change24.isZero() ? '' : change24.isPositive() ? '+' : '-';
            const value = change24.abs().toFormat(2) + '%';

            this.setUnitValue(this.changeUnit, prefix + value, this.store.isPositive ? 'up' : 'down');
        });

        // High/Low values
        autorun(() => {
            const pricePrecision = this.store.pricePrecision;

            const high = new BigNumber(this.store.high);
            this.setUnitValue(this.highUnit, high.isNaN() ? '---' : high.toFormat(pricePrecision));

            const low = new BigNumber(this.store.low);
            this.setUnitValue(this.lowUnit, low.isNaN() ? '---' : low.toFormat(pricePrecision));
        });

        // Volume 24H
        autorun(() => {
            const volumePrecision = this.store.volumePrecision;
            const volume = new BigNumber(this.store.volume24h);
            const baseAsset = this.store.baseAsset || '';

            this.setUnitValue(
                this.volumeUnit,
                volume.gt(0)
                    ? `${volume.toFormat(volumePrecision)} ${baseAsset.toUpperCase()}`
                    : '---',
            );
        });
    }
}
