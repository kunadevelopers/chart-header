import React from 'react';
import ReactDOM from 'react-dom';

import ChartHeaderComponent from './ChartHeaderComponent';
import CHController from './chController';

export function create(containerSelector: string): CHController {
    const element = document.querySelector(containerSelector);

    ReactDOM.render(
        <ChartHeaderComponent />,
        element,
    );

    return new CHController();
}

type KunaChartHeader = {
    create(containerSelector: string): CHController;
}

export default KunaChartHeader;
