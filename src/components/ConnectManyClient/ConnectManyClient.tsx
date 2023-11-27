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
    ControlProps,
    
    
    
    // simple-components:
    Button,
    
    
    
    // status-components:
    Popup,
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
import {
    ElementWithDraggable,
}                           from './ElementWithDraggable'
import {
    ElementWithDroppable,
}                           from './ElementWithDroppable'
import {
    Cable,
    CableProps,
}                           from './Cable'

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

// styles:
import {
    useConnectManyClientStyleSheet,
}                           from './styles/loader'



export interface ConnectManyClientProps
    extends
        // bases:
        BasicProps
{
    // configs:
    connections    : ConnectionConfig
    
    
    
    // values:
    value ?: Connection[]
    onValueChange ?: (newValue: Connection[]) => void
    
    
    
    // components:
    defaultNodeComponent ?: React.ReactComponentElement<any, ControlProps<Element>>
    defaultLedComponent  ?: React.ReactComponentElement<any, IndicatorProps<Element>>
}
export const ConnectManyClient = (props: ConnectManyClientProps): JSX.Element|null => {
    // styles:
    const styleSheet = useConnectManyClientStyleSheet();
    
    
    
    const {
        // configs:
        connections,
        
        
        
        // values:
        value,
        onValueChange,
        
        
        
        // components:
        defaultNodeComponent = <Connector /> as React.ReactComponentElement<any, ControlProps<Element>>,
        defaultLedComponent  = <Led />       as React.ReactComponentElement<any, IndicatorProps<Element>>,
    ...restBasicProps} = props;
    const allNodes = Object.values(connections).flatMap((group) => group.nodes);
    
    
    
    // refs:
    const [nodeRefs] = useState<Map<React.Key, Element|null>>(() => new Map<React.Key, Element|null>());
    
    
    
    // states:
    const {
        // registrations:
        registerConnectManyClient,
        
        
        
        // identifiers:
        connectDragDataType,
        
        
        
        // states:
        isDragging,
        isDroppingAllowed,
        
        
        
        // handlers:
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useConnectState();
    
    
    
    // effects:
    
    // register the existance of current <ConnectManyClient>:
    useIsomorphicLayoutEffect(() => {
        // setups:
        const unregisterConnectManyClient = registerConnectManyClient({
            // refs:
            nodeRefs,
            
            
            
            // configs:
            connections,
        });
        
        
        
        // cleanups:
        return () => {
            unregisterConnectManyClient();
        };
    }, []);
    
    
    
    // jsx:
    return (
        <Basic
            // other props:
            {...restBasicProps}
            mainClass={styleSheet.connectManyClient}
            
            
            
            // handlers:
            // onMouseMove={handleMouseMove}
            // onDragOver={handleDragOver}
            
            // onMouseUp={handleDragEnd}
            // onDragEnd={handleDragEnd}
        >
            {Object.entries(connections).map(([groupKey, {label: groupName, nodes, leds}], groupIndex) =>
                <div key={groupKey} className='group'>
                    {!!groupName && <div className='label'>{groupName}</div>}
                    <div className='nodes'>
                        {nodes.map(({id: nodeId, label, limit = Infinity, enabled = true, nodeComponent = defaultNodeComponent}, nodeIndex) => {
                            const isMutable = (
                                (limit === Infinity)
                                ||
                                ((): boolean => {
                                    const connectionLimit = (allNodes.find(({id}) => (id === nodeId))?.limit ?? Infinity);
                                    if (connectionLimit === Infinity) return true;
                                    const connectedCount = (value ?? []).filter(({sideA, sideB}) => (sideA === nodeId) || (sideB === nodeId)).length;
                                    return (connectionLimit > connectedCount);
                                })()
                            );
                            
                            
                            
                            // jsx:
                            if (!nodeRefs.has(nodeId)) nodeRefs.delete(nodeId);
                            return (
                                <ElementWithDraggable
                                    // identifiers:
                                    key={nodeId || nodeIndex}
                                    nodeId={nodeId}
                                    
                                    
                                    
                                    // draggable:
                                    draggable={enabled && isMutable}
                                    dragDataType={connectDragDataType}
                                    
                                    
                                    
                                    // components:
                                    elementComponent={
                                        <ElementWithDroppable
                                            // identifiers:
                                            nodeId={nodeId}
                                            
                                            
                                            
                                            // draggable:
                                            dragDataType={connectDragDataType}
                                            
                                            
                                            
                                            // components:
                                            elementComponent={
                                                <ChildWithRef
                                                    // refs:
                                                    childId={nodeId}
                                                    childRefs={nodeRefs}
                                                    
                                                    
                                                    
                                                    // components:
                                                    elementComponent={
                                                        React.cloneElement(nodeComponent,
                                                            // props:
                                                            {
                                                                // identifiers:
                                                                key             : nodeId || nodeIndex,
                                                                
                                                                
                                                                
                                                                // classes:
                                                                className : (
                                                                    (isDragging !== nodeId)
                                                                    ? ''
                                                                    : (isDroppingAllowed ? 'dodrop' : 'nodrop')
                                                                ),
                                                                
                                                                
                                                                
                                                                // accessibilities:
                                                                'aria-readonly' : nodeComponent.props['aria-readonly'] ?? !isMutable,
                                                                enabled : enabled,
                                                            },
                                                            
                                                            
                                                            
                                                            // children:
                                                            nodeComponent.props.children ?? label,
                                                        )
                                                    }
                                                />
                                            }
                                            
                                            
                                            
                                            // droppable:
                                            onDragOver={handleDragOver}
                                        />
                                    }
                                    
                                    
                                    
                                    // handlers:
                                    onMouseDown={handleDragStart}
                                    onDragStart={handleDragStart}
                                    // onDragOver={(event) => console.log(event.clientX)}
                                />
                            );
                        })}
                    </div>
                    <div className={`leds plc-${leds?.placement ?? 'start'}`}>
                        {(leds?.items ?? []).map(({label, active, theme, ledComponent = defaultLedComponent}, itemIndex) =>
                            React.cloneElement(ledComponent,
                                // props:
                                {
                                    key    : itemIndex,
                                    active : ledComponent.props.active ?? active,
                                    theme  : ledComponent.props.theme  ?? theme,
                                },
                                
                                
                                
                                // children:
                                ledComponent.props.children ?? label,
                            )
                        )}
                    </div>
                </div>
            )}
        </Basic>
    );
};
