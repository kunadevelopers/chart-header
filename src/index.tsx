import React from 'react';
import ReactDOM from 'react-dom';

class ChartHeaderController {

}

export function create(containerSelector: string): ChartHeaderController {
    const element = document.querySelector(containerSelector);

    ReactDOM.render(
        <div>Some text</div>,
        element,
    );

    const controller = new ChartHeaderController();

    return controller;
}

type KunaChartHeader = {
    create(containerSelector: string): ChartHeaderController;
}

export default KunaChartHeader;
