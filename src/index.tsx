import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import ChartHeaderComponent from './ChartHeaderComponent';
import KCHController, { KCHOption } from './kchController';

export function create(containerSelector: string, option: KCHOption): KCHController {
    configure({ enforceActions: 'observed' });

    const element = document.querySelector(containerSelector);
    const kchStore = new KCHController(option);

    ReactDOM.render(
        <ChartHeaderComponent kchStore={kchStore} />,
        element,
    );

    return kchStore;
}

type KunaChartHeader = {
    create(containerSelector: string): KCHController;
}

export default KunaChartHeader;
