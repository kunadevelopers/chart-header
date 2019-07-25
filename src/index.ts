import { configure } from 'mobx';
import KCHController, { KCHOption } from './kchController';
import ChartHeaderElement from './ChartHeaderElement';

export function create(
    containerSelector: string, option: KCHOption): KCHController {
    configure({ enforceActions: 'observed' });

    const rootElement = document.querySelector(containerSelector);
    if (!rootElement) {
        throw new Error(`Element "${containerSelector}" not found`);
    }

    const kchStore = new KCHController(option);
    new ChartHeaderElement(rootElement, kchStore);

    return kchStore;
}

type KunaChartHeader = {
    create(containerSelector: string): KCHController;
}

export default KunaChartHeader;
