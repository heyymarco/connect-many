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
export interface IdentifierProps extends BasicProps {
    // data:
    title ?: React.ReactNode
    pid   ?: React.ReactNode
    ip    ?: string
    usb   ?: string
}
export const Identifier = (props: IdentifierProps) => {
    // styles:
    const styleSheet = useFrontalViewStyleSheet();
    
    
    
    const {
        // data:
        title,
        pid,
        ip,
        usb,
        
        
        
        // children:
        children : actions,
    ...restBasicProps} = props;
    
    
    
    // jsx:
    return (
        <Basic
            // other props:
            {...restBasicProps}
            mainClass={styleSheet.identifier}
        >
            {!!title && <h1 className='title'>{title}</h1>}
            {!!pid && <span className='pid'>PID: {pid}</span>}
            {!!actions && <div className='actions'>
                {actions}
            </div>}
            {!!ip && <span className='ip'>IP: {ip}</span>}
            {!!usb && <span className='usb'>USB: {usb}</span>}
        </Basic>
    );
}
