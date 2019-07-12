import React from 'react';
import cn from 'classnames';

type UnitProps = {
    title: React.ReactNode;
    children: React.ReactNode;
    contentClassName?: string;
    valueDirection?: 'up' | 'down';
};

export default function Unit(props: UnitProps): JSX.Element {

    const valueClasses = [
        'kch-unit-value',
        props.contentClassName,
    ];

    if (props.valueDirection) {
        valueClasses.push(
            props.valueDirection === 'up' ? 'kch-value-up' : 'kch-value-down',
        );
    }

    return (
        <dl className="kch-unit">
            <dt className="kch-unit-title">{props.title}</dt>
            <dd className={cn(valueClasses)}>{props.children}</dd>
        </dl>
    );
}
