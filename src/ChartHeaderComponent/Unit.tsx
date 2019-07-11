import React from 'react';

type UnitProps = {
    title: React.ReactNode;
    children: React.ReactNode;
    contentClassName?: string;
};

export default function Unit(props: UnitProps): JSX.Element {
    return (
        <dl>
            <dt>{props.title}</dt>
            <dd className={props.contentClassName}>{props.children}</dd>
        </dl>
    );
}
