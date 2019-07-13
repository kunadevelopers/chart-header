# Kuna Chart Header


## How it looks

![Desktop](https://raw.githubusercontent.com/kunadevelopers/chart-header/master/images/full-size.png)

![Mobile](https://raw.githubusercontent.com/kunadevelopers/chart-header/master/images/mobile-size.png)


## How to Install and use this module?

Example of Kuna Chart Header

```html
<link href="/css/kch-style.css" rel="stylesheet" />
<script src="/lib/kuna-chart-header.js"></script>

<div id="kuna-chart-header"></div>


<script>
    var chartHeader = KunaChartHeader.create('#kuna-chart-header', {
        baseAsset: 'BTC',
        quoteAsset: 'UAH',

        lastPrice: 3703928,
        usdRate: 0.031,

        pricePrecision: 0,
        volumePrecision: 5,
        // High price
        high: 3923400,
        
        // Low price
        low: 3600000,

        volume24h: 24.0281,
        change24h: -0.0312,
    });

    chartHeader.setData({
        lastPrice: 3900128,
    });
</script>

```