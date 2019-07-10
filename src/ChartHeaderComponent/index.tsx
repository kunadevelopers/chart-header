import React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import KCHController from '../kchController';
import MainComponent from './MainComponent';

type ChartHeaderProps = {
    kchStore: KCHController;
}

export default function ChartHeaderComponent(props: ChartHeaderProps) {
    return (
        <MobxProvider kchStore={props.kchStore}>
            <MainComponent />
        </MobxProvider>
    );
}
