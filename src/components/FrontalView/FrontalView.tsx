'use client'

// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import {
    // base-components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components

// internal components:
import {
    ConnectManyProps,
}                           from '@/components/ConnectMany'
import type {
    HeaderProps,
}                           from './Header'
import type {
    IdentifierProps,
}                           from './Identifier'

// styles:
import {
    useFrontalViewStyleSheet,
}                           from './styles/loader'



// react components:
export interface FrontalViewProps extends Omit<BasicProps, 'children'> {
    // components:
    header     ?: React.ReactComponentElement<any, HeaderProps>
    identifier ?: React.ReactComponentElement<any, IdentifierProps>
    
    
    
    // children:
    children    : React.ReactComponentElement<any, ConnectManyProps>|Iterable<React.ReactComponentElement<any, ConnectManyProps>>
}
export const FrontalView = (props: FrontalViewProps) => {
    // styles:
    const styleSheet = useFrontalViewStyleSheet();
    
    
    
    const {
        // components:
        header,
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
            
            {!!header && React.cloneElement(header,
                // props:
                {
                    className : `header ${header.props.className}`,
                },
            )}
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
