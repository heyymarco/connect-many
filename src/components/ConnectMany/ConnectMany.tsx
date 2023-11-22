'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useState,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components

// internal components:
import {
    CircleConnection,
}                           from './CircleConnection'
import {
    ChildWithRef,
}                           from './ChildWithRef'
import {
    Cable,
    CableProps,
}                           from './Cable'

// styles:
import {
    useConnectManyStyleSheet,
}                           from './styles/loader'



export interface ConnectionNode {
    id             : string|number
    label         ?: React.ReactNode
    limit         ?: number
    nodeComponent ?: React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>
}
export interface ConnectionGroup {
    label ?: React.ReactNode
    nodes  : ConnectionNode[]
}
export type ConnectionConfig = {
    [key in string] : ConnectionGroup
}
export interface Connection {
    sideA : string
    sideB : string
}
export interface ConnectManyProps
    extends
        // bases:
        BasicProps,
        
        // components:
        Pick<CableProps,
            // behaviors:
            |'precisionLevel'
        >
{
    // configs:
    connections    : ConnectionConfig
    
    
    
    // values:
    value ?: Connection[]
    
    
    
    // components:
    defaultNodeComponent ?: React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>
}
type CableDef = Connection & Pick<CableProps, 'headX'|'headY'|'tailX'|'tailY'>
export const ConnectMany = (props: ConnectManyProps): JSX.Element|null => {
    // styles:
    const styleSheet = useConnectManyStyleSheet();
    
    
    
    const {
        // configs:
        connections,
        
        
        
        // behaviors:
        precisionLevel,
        
        
        
        // values:
        value,
        
        
        
        // components:
        defaultNodeComponent = <CircleConnection /> as React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const [nodeRefs] = useState<Map<React.Key, Element|null>>(() => new Map<React.Key, Element|null>());
    const svgRef     = useRef<SVGSVGElement|null>(null);
    
    
    
    // states:
    const [cables, setCables] = useState<CableDef[]>([]);
    
    
    
    // effects:
    const [validCables, setValidCables] = useState<(Connection & { elmA : Element, elmB: Element })[]>([]);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!value?.length) {
            setCables([]);
            return;
        } // if
        
        
        
        // setups:
        const newValidCables : typeof validCables = [];
        const invalidCables : Connection[] = [];
        for (const val of value) {
            const {sideA, sideB} = val;
            const elmA = nodeRefs.get(sideA) ?? null;
            const elmB = nodeRefs.get(sideB) ?? null;
            
            if (!elmA || !elmB) {
                invalidCables.push(val);
            }
            else {
                newValidCables.push({
                    sideA,
                    elmA,
                    
                    sideB,
                    elmB,
                });
            } // if
        } //
        setValidCables(newValidCables);
        
        // remove invalid connections, if any:
        if (invalidCables.length) {
            // TODO: trigger onValueChange
        } // if
        
    }, [value]);
    
    const refreshCables = useEvent((): void => {
        // conditions:
        const svgElm = svgRef.current;
        if (!svgElm) return;
        
        
        
        const newCables : typeof cables = [];
        const {left: svgLeft, top: svgTop } = svgElm.getBoundingClientRect();
        for (const {sideA, elmA, sideB, elmB} of validCables) {
            const rectA = elmA.getBoundingClientRect();
            const rectB = elmB.getBoundingClientRect();
            
            const headX = (rectA.left - svgLeft) + (rectA.width  / 2);
            const headY = (rectA.top  - svgTop ) + (rectA.height / 2);
            const tailX = (rectB.left - svgLeft) + (rectB.width  / 2);
            const tailY = (rectB.top  - svgTop ) + (rectB.height / 2);
            newCables.push({
                sideA,
                headX,
                headY,
                
                sideB,
                tailX,
                tailY,
            });
        } // for
        setCables(newCables);
    });
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const svgElm = svgRef.current;
        if (!svgElm) return;
        
        
        
        // setups:
        refreshCables();
        
        const resizeObserver = new ResizeObserver(refreshCables);
        resizeObserver.observe(svgElm, { box: 'content-box' });
        for (const uniqueElm of new Set<Element>(validCables.map(({elmA, elmB}) => [elmA, elmB]).flat())) {
            resizeObserver.observe(uniqueElm, { box: 'border-box' });
        } // for
        
        
        
        // cleanups:
        return () => {
            resizeObserver.disconnect();
        };
    }, [validCables]);
    
    
    
    // handlers:
    const pointerActiveRef   = useRef<boolean>(false);
    const pointerPositionRef = useRef<{x: number, y: number}>({x: 0, y: 0});
    
    const calculatePointerPosition = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
        const viewportRect = event.currentTarget.getBoundingClientRect();
        const style = getComputedStyle(event.currentTarget);
        const borderLeftWidth = Number.parseInt(style.borderLeftWidth);
        const borderTopWidth  = Number.parseInt(style.borderTopWidth);
        const [relativeX, relativeY] = [event.clientX - viewportRect.left - borderLeftWidth, event.clientY - viewportRect.top - borderTopWidth];
        if (relativeX < 0) return;
        if (relativeY < 0) return;
        const borderRightWidth = Number.parseInt(style.borderLeftWidth);
        const borderBottomWidth  = Number.parseInt(style.borderTopWidth);
        if (relativeX > (viewportRect.width  - borderLeftWidth - borderRightWidth )) return;
        if (relativeY > (viewportRect.height - borderTopWidth  - borderBottomWidth)) return;
        pointerPositionRef.current = {x: relativeX, y: relativeY};
    });
    const handleMouseMove = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
        if (!pointerActiveRef.current) return;
        calculatePointerPosition(event);
    });
    
    
    const handleMouseDown = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
        pointerActiveRef.current = true;
        calculatePointerPosition(event);
    });
    const handleMouseUp   = useEvent<React.MouseEventHandler<HTMLElement>>(() => {
        pointerActiveRef.current = false;
    });
    
    
    
    // jsx:
    return (
        <Basic
            // other props:
            {...restBasicProps}
            className={styleSheet.main}
            
            
            
            // handlers:
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {Object.entries(connections).map(([groupKey, {label: groupName, nodes}], groupIndex) =>
                <div key={groupKey} className='group'>
                    {!!groupName && <div className='label'>{groupName}</div>}
                    <div className='nodes'>
                        {nodes.map(({id, label, limit, nodeComponent = defaultNodeComponent}, nodeIndex) => {
                            const nodeId = id;
                            
                            
                            
                            // jsx:
                            if (!nodeRefs.has(nodeId)) nodeRefs.delete(nodeId);
                            return (
                                <ChildWithRef
                                    // identifiers:
                                    key={id || nodeIndex}
                                    
                                    
                                    
                                    // refs:
                                    childId={nodeId}
                                    childRefs={nodeRefs}
                                    
                                    
                                    
                                    // components:
                                    elementComponent={
                                        React.cloneElement(nodeComponent,
                                            // props:
                                            {
                                                key : id || nodeIndex,
                                            },
                                            
                                            
                                            
                                            // children:
                                            nodeComponent.props.children ?? label,
                                        )
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            <svg className='cables' ref={svgRef}>
                {cables.map(({sideA, headX, headY, sideB, tailX, tailY}, cableIndex) =>
                    <Cable
                        // identifiers:
                        key={`${sideA}/${sideB}`}
                        
                        
                        
                        // positions:
                        headX={headX}
                        headY={headY}
                        tailX={tailX}
                        tailY={tailY}
                        
                        
                        
                        // behaviors:
                        precisionLevel={precisionLevel}
                        
                        
                        
                        // pointers:
                        pointerPositionRef={pointerPositionRef}
                    />
                )}
            </svg>
        </Basic>
    );
};
