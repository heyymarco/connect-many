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
export interface FrontalViewProps extends Omit<BasicProps, 'children'> {
    // components:
    identifier ?: React.ReactComponentElement<any, any>
    
    
    
    // children:
    children    : React.ReactComponentElement<any, ConnectManyProps>|Iterable<React.ReactComponentElement<any, ConnectManyProps>>
}
export const FrontalView = (props: FrontalViewProps) => {
    // styles:
    const styleSheet = useFrontalViewStyleSheet();
    
    
    
    const {
        // components:
        identifier,
        
        
        
        // children:
        children : panels,
    ...restBasicProps} = props;
    
    
    
    // jsx:
    return (
        <Basic
            // other props:
            {...restBasicProps}
            mainClass={styleSheet.frontalView}
        >
            <div className='panels'>
                {panels}
            </div>
            {!!identifier && React.cloneElement(identifier,
                // props:
                {
                    className : `identifier ${identifier.props.className}`,
                },
            )}
        </Basic>
    );
}
