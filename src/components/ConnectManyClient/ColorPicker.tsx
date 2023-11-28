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
    usesThemeable,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    BasicProps,
    Basic,
    IndicatorProps,
    ControlProps,
    
    
    
    // simple-components:
    Icon,
    Button,
    
    
    
    // layout-components:
    ListItem,
    
    
    
    // status-components:
    Popup,
    Badge,
    
    
    
    // menu-components:
    DropdownButtonProps,
    DropdownButton,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components

// internal components:
import {
    Connector,
}                           from './Connector'
import {
    Led,
}                           from './Led'
import {
    ChildWithRef,
}                           from './ChildWithRef'

// types:
import type {
    ConnectionConfig,
    Connection,
}                           from './types'

// internals:
import {
    // states:
    useConnectState,
}                           from './states/connectState'

// other libs:
import type Color           from 'color'                        // color utilities

// styles:
import {
    useConnectManyClientStyleSheet,
}                           from './styles/loader'



export interface ColorPickerProps extends Omit<DropdownButtonProps, 'value'|'children'> {
    // value:
    value         ?: Color
    onValueChange ?: (newValue: Color) => void
}
export const ColorPicker = (props: ColorPickerProps): JSX.Element|null => {
    const {
        // value:
        value,
        onValueChange,
    ...restDropdownButtonProps} = props;
    
    
    
    // styles:
    const style = useMemo<React.CSSProperties>(() => {
        const {themeableVars} = usesThemeable();
        return {
            [
                themeableVars.backg
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ] : value?.hexa(),
        };
    }, [value]);
    
    
    
    // jsx:
    return (
        <DropdownButton
            // other props:
            {...restDropdownButtonProps}
            
            
            
            // styles:
            style={style}
        >
            <Basic style={style}>
                test
            </Basic>
        </DropdownButton>
    );
}