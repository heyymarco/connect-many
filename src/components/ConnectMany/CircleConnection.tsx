'use client'

// react:
import {
    // react:
    default as React,
    useEffect,
    useRef,
    useState,
}                           from 'react'
import { ControlProps, Control } from '@reusable-ui/components'
import { useConnectManyStyleSheet } from './styles/loader'



export interface CircleConnectionProps extends ControlProps {}
export const CircleConnection = (props: CircleConnectionProps) => {
    // styles:
    const styleSheet = useConnectManyStyleSheet();
    
    
    
    return (
        <Control
            {...props}
            size={props.size ?? 'sm'}
            mild={props.mild ?? false}
            className={styleSheet.circleConnection}
        />
    );
};