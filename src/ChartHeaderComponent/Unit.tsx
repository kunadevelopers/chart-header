import React from 'react';
import cn from 'classnames';

type UnitProps = {
    title: React.ReactNode;
    children: React.ReactNode;
    contentClassName?: string;
};

export default function Unit(props: UnitProps): JSX.Element {
    return (
        <dl className="kch-unit">
            <dt className="kch-unit-title">{props.title}</dt>
            <dd className={cn('kch-unit-value', props.contentClassName)}>
                {props.children}
            </dd>
        </dl>
    );
}
