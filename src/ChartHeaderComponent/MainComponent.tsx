import React from 'react';
import { inject, observer } from 'mobx-react';

class MainComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <div>Test</div>
        );
    }
}

export default inject('kchStore')(
    observer(MainComponent),
);