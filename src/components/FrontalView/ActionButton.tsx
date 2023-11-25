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
    ButtonProps,
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
export interface ActionButtonProps extends ButtonProps { }
export const ActionButton = (props: ActionButtonProps) => {
    // styles:
    const styleSheet = useFrontalViewStyleSheet();
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...props}
            mainClass={styleSheet.actionButton}
        />
    );
}
