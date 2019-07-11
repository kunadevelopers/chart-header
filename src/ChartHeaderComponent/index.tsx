import React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import MainComponent from './MainComponent';

type ChartHeaderProps = {
    kchStore: mobx.IKCHSStore;
}

export default function ChartHeaderComponent(props: ChartHeaderProps) {
    return (
        <MobxProvider kchStore={props.kchStore}>
            <MainComponent />
        </MobxProvider>
    );
}
