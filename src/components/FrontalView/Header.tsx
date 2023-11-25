'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useState,
    useMemo,
    useId,
    HTMLAttributes,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    useScheduleTriggerEvent,
    
    
    
    // color options of UI:
    ThemeName,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    BasicProps,
    Basic,
    IndicatorProps,
    Indicator,
    ControlProps,
    
    
    
    // simple-components:
    Button,
    
    
    
    // status-components:
    Popup,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components

// internal components:
import {
    ConnectManyProps,
}                           from '@/components/ConnectMany'

// styles:
import {
    useFrontalViewStyleSheet,
}                           from './styles/loader'



// react components:
export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    // data:
    logo        ?: React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>
    title       ?: React.ReactNode
    description ?: React.ReactNode
    serial      ?: string
}
export const Header = (props: HeaderProps) => {
    // styles:
    const styleSheet = useFrontalViewStyleSheet();
    
    
    
    const {
        // data:
        logo,
        title,
        description,
        serial,
    } = props;
    
    
    
    // jsx:
    return (
        <div
            className={styleSheet.header}
        >
            {!!logo && React.cloneElement(logo,
                {
                    className : `logo ${logo?.props.className ?? ''}`,
                },
            )}
            {!!title && <h1 className='title'>{title}</h1>}
            <hr className='horz' />
            {!!description && <span className='description'>{description}</span>}
            {!!serial && <span className='serial'>{serial}</span>}
        </div>
    );
}
