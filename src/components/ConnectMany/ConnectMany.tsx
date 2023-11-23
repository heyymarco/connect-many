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
    useScheduleTriggerEvent,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    BasicProps,
    Basic,
    ControlProps,
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
    nodeComponent ?: React.ReactComponentElement<any, ControlProps<Element>>
}
export interface ConnectionGroup {
    label ?: React.ReactNode
    nodes  : ConnectionNode[]
}
export type ConnectionConfig = {
    [key in string] : ConnectionGroup
}
export interface Connection {
    sideA : string|number
    sideB : string|number
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
    onValueChange ?: (newValue: Connection[]) => void
    
    
    
    // animations:
    magnetTransitionInterval ?: number
    
    
    
    // components:
    defaultNodeComponent ?: React.ReactComponentElement<any, ControlProps<Element>>
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
        onValueChange,
        
        
        
        // animations:
        magnetTransitionInterval = 150, // ms
        
        
        
        // components:
        defaultNodeComponent = <CircleConnection /> as React.ReactComponentElement<any, ControlProps<Element>>,
    ...restBasicProps} = props;
    const allNodes = Object.values(connections).flatMap((group) => group.nodes);
    
    
    
    // refs:
    const [nodeRefs] = useState<Map<React.Key, Element|null>>(() => new Map<React.Key, Element|null>());
    const svgRef     = useRef<SVGSVGElement|null>(null);
    
    
    
    // states:
    const [cables, setCables] = useState<CableDef[]>([]);
    
    
    
    // effects:
    const [validCables, setValidCables] = useState<(Connection & { elmA : Element, elmB: Element })[]>([]);
    const [draftCable , setDraftCable ] = useState<(Connection & { elmA : Element, elmB: Element|null, transition: number, lastX: number, lastY: number })|null>(null);
    
    // watchdog for value => validCables:
    useIsomorphicLayoutEffect(() => {
        // setups:
        const newValidCables   : typeof validCables = [];
        const oldInvalidCables : Connection[] = [];
        for (const val of (value ?? [])) {
            const {sideA, sideB} = val;
            const elmA = nodeRefs.get(sideA) ?? null;
            const elmB = nodeRefs.get(sideB) ?? null;
            
            if (elmA && elmB) {
                newValidCables.push({
                    sideA,
                    elmA,
                    
                    sideB,
                    elmB,
                });
            }
            else {
                oldInvalidCables.push(val);
            } // if
        } //
        setValidCables(newValidCables);
        
        
        
        // trigger onValueChange if there's some invalid cables:
        if (onValueChange && oldInvalidCables.length) {
            triggerValueChange((value ?? []).filter((val) => !oldInvalidCables.includes(val)));
        } // if
    }, [value]);
    
    // convert validCables & draftCable => cables:
    const refreshCables = useEvent((): void => {
        // conditions:
        const svgElm = svgRef.current;
        if (!svgElm) return;
        
        
        
        const newCables : typeof cables = [];
        const {left: svgLeft, top: svgTop } = svgElm.getBoundingClientRect();
        for (const cable of [...validCables, ...(draftCable ? [draftCable] : [])]) {
            const {sideA, elmA, sideB, elmB} = cable;
            
            const rectA = elmA.getBoundingClientRect();
            const rectB = elmB?.getBoundingClientRect();
            
            const headX =         (rectA.left - svgLeft) + (rectA.width  / 2);
            const headY =         (rectA.top  - svgTop ) + (rectA.height / 2);
            const tailX = rectB ? (rectB.left - svgLeft) + (rectB.width  / 2) : pointerPositionRef.current.x;
            const tailY = rectB ? (rectB.top  - svgTop ) + (rectB.height / 2) : pointerPositionRef.current.y;
            
            const isDraftCable = 'transition' in cable;
            if (isDraftCable && !!rectB) {
                cable.lastX = tailX;
                cable.lastY = tailY;
            } // if
            
            newCables.push({
                sideA,
                headX,
                headY,
                
                sideB : !isDraftCable ? sideB : '',
                tailX : !isDraftCable ? tailX : ((cable.lastX * cable.transition) + (pointerPositionRef.current.x * (1 - cable.transition))),
                tailY : !isDraftCable ? tailY : ((cable.lastY * cable.transition) + (pointerPositionRef.current.y * (1 - cable.transition))),
            });
        } // for
        setCables(newCables);
    });
    
    // watchdog for onResize => refreshCables():
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
    }, [validCables, draftCable]);
    
    // draft cable magnetic transition:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!draftCable) return; // no draft cable => ignore
        if (!!draftCable.elmB ? (draftCable.transition >= 1) : (draftCable.transition <= 0)) return; // magnetic transition done => ignore
        
        
        
        // handlers:
        const transitionSpeed = (!!draftCable.elmB ? +1 : -1) / magnetTransitionInterval;
        let previousTime : number|undefined = undefined;
        const handleAnimate : FrameRequestCallback = (currentTime) => {
            if (previousTime === undefined) {
                previousTime = currentTime;
                cancelAnimating = requestAnimationFrame(handleAnimate);
                return;
            } // if
            const deltaTime = currentTime - previousTime;
            previousTime = currentTime;
            
            const remainingTransition = !!draftCable.elmB ? (1 - draftCable.transition) : draftCable.transition;
            let deltaTransition = transitionSpeed * deltaTime;
            if (!!draftCable.elmB) {
                deltaTransition = Math.min(Math.max(0, deltaTransition), +remainingTransition);
            }
            else {
                deltaTransition = Math.max(Math.min(0, deltaTransition), -remainingTransition)
            } // if
            draftCable.transition += deltaTransition;
            
            
            
            if (Math.abs(remainingTransition) > 0.01) {
                cancelAnimating = requestAnimationFrame(handleAnimate);
            }
            else {
                draftCable.transition = !!draftCable.elmB ? 1 : 0;
            } // if
            
            
            
            setDraftCable({...draftCable});
        };
        
        
        
        // setups:
        let cancelAnimating = requestAnimationFrame(handleAnimate);
        
        
        
        // cleanups:
        return () => {
            cancelAnimationFrame(cancelAnimating);
        };
    }, [draftCable, magnetTransitionInterval]);
    
    
    
    // events:
    const scheduleTriggerEvent        = useScheduleTriggerEvent();
    const triggerValueChange          = useEvent((newValue: Connection[]): void => {
        if (onValueChange) scheduleTriggerEvent(() => { // runs the `onValueChange` event *next after* current macroTask completed
            onValueChange(newValue);
        });
    });
    
    
    
    // handlers:
    const [isDragging, setIsDragging] = useState<string|number|false>(false);
    const pointerPositionRef          = useRef<{x: number, y: number}>({x: 0, y: 0});
    
    const calculatePointerPosition    = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
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
    const handleMouseMove             = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
        if (isDragging === false) return;
        calculatePointerPosition(event);
        
        
        
        if (draftCable) {
            const selectedNode = getNodeFromPoint(event.clientX, event.clientY);
            if (
                // has selection node:
                selectedNode
                &&
                // not point to disabled node:
                !(!!selectedNode.elm.ariaDisabled && (selectedNode.elm.ariaDisabled !== 'false'))
                &&
                // not point to the node itself:
                ((draftCable.sideA !== selectedNode.id) && (draftCable.elmA !== selectedNode.elm))
            ) {
                const startingNodeId = draftCable.sideA
                const selectedNodeId = selectedNode.id;
                if (
                    // not point to self group:
                    ((): boolean => {
                        const nodeGroups = Object.values(connections).map((group) => group.nodes.map((node) => node.id));
                        const sideAGroup        = nodeGroups.find((nodeGroup) => nodeGroup.includes(startingNodeId));
                        const selectedNodeGroup = nodeGroups.find((nodeGroup) => nodeGroup.includes(selectedNodeId));
                        return (sideAGroup !== selectedNodeGroup);
                    })()
                    &&
                    // not already having exact connection:
                    ((): boolean => {
                        if (!value) return true; // passed
                        if (value.some(({sideA, sideB}) =>
                            ((startingNodeId === sideA) && (selectedNodeId === sideB))
                            ||
                            ((startingNodeId === sideB) && (selectedNodeId === sideA))
                        )) return false; // failed
                        return true; // passed
                    })()
                    &&
                    // still within connection limit:
                    ((): boolean => {
                        const connectionLimit = allNodes.find(({id}) => (id === selectedNodeId))?.limit ?? Infinity;
                        if (connectionLimit === Infinity) return true;
                        const connectedCount = (value ?? []).filter(({sideA, sideB}) => (sideA === selectedNodeId) || (sideB === selectedNodeId)).length;
                        return (connectionLimit > connectedCount);
                    })()
                ) {
                    if (
                        // not already previously magnetized:
                        ((draftCable.sideB !== selectedNodeId) && (draftCable.elmB !== selectedNode.elm))
                    ) {
                        // magnetize:
                        setDraftCable({
                            ...draftCable,
                            
                            sideB      : selectedNodeId,
                            elmB       : selectedNode.elm,
                            
                            transition : 0, // restart attach transition from cursor to node
                        });
                    } // if
                } // if
            }
            else {
                if ((draftCable.sideB !== '') || (draftCable.elmB !== null)) {
                    setDraftCable({
                        ...draftCable,
                        
                        sideB      : '',
                        elmB       : null,
                    });
                } // if
            } // if
            
            
            
            requestAnimationFrame(refreshCables);
        };
    });
    
    const getNodeFromPoint            = useEvent((clientX: number, clientY: number): { id: string|number, elm: Element }|null => {
        const selectedNodeElms = document.elementsFromPoint(clientX, clientY);
        if (!selectedNodeElms.length) return null;
        const selectedNode = Array.from(nodeRefs.entries()).find(([key, elm]) => !!elm && selectedNodeElms.includes(elm));
        if (!selectedNode) return null;
        const [id, elm] = selectedNode;
        if (!elm) return null;
        return { id: id as (string|number), elm };
    });
    const handleMouseDown             = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
        // conditions:
        if (!!event.currentTarget.ariaDisabled && (event.currentTarget.ariaDisabled !== 'false')) return; // ignore if disabled
        
        
        
        calculatePointerPosition(event);
        
        
        
        const selectedNode = getNodeFromPoint(event.clientX, event.clientY);
        if (
            // has selection node:
            selectedNode
        ) {
            const startingNodeId = selectedNode.id;
            if (isDragging === false) setIsDragging(startingNodeId);
            
            
            
            if (
                // still within connection limit:
                ((): boolean => {
                    const connectionLimit = allNodes.find(({id}) => (id === startingNodeId))?.limit ?? Infinity;
                    if (connectionLimit === Infinity) return true;
                    const connectedCount = (value ?? []).filter(({sideA, sideB}) => (sideA === startingNodeId) || (sideB === startingNodeId)).length;
                    return (connectionLimit > connectedCount);
                })()
            ) {
                setDraftCable({
                    sideA      : selectedNode.id,
                    elmA       : selectedNode.elm,
                    
                    sideB      : '',
                    elmB       : null,
                    
                    transition : 0,
                    lastX      : 0,
                    lastY      : 0,
                });
            } // if
        } // if
    });
    const handleMouseUp               = useEvent<React.MouseEventHandler<HTMLElement>>(() => {
        if (isDragging !== false) setIsDragging(false);
        
        
        
        if (draftCable && draftCable.sideB && draftCable.elmB) {
            const newValidCable : typeof validCables[number] = {
                sideA : draftCable.sideA,
                elmA  : draftCable.elmA,
                
                sideB : draftCable.sideB,
                elmB  : draftCable.elmB,
            };
            setValidCables([
                ...validCables,
                newValidCable,
            ]);
            
            
            // trigger onValueChange of a new cable:
            if (onValueChange) {
                triggerValueChange([
                    ...(value ?? []),
                    
                    {
                        sideA : draftCable.sideA,
                        sideB : draftCable.sideB,
                    },
                ]);
            } // if
        } // if
        if (draftCable) setDraftCable(null);
    });
    
    
    
    // jsx:
    return (
        <Basic
            // other props:
            {...restBasicProps}
            className={`${styleSheet.main}${isDragging ? ' dragging' : ''}`}
            
            
            
            // handlers:
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {Object.entries(connections).map(([groupKey, {label: groupName, nodes}], groupIndex) =>
                <div key={groupKey} className='group'>
                    {!!groupName && <div className='label'>{groupName}</div>}
                    <div className='nodes'>
                        {nodes.map(({id: nodeId, label, limit = Infinity, nodeComponent = defaultNodeComponent}, nodeIndex) => {
                            
                            
                            
                            // jsx:
                            if (!nodeRefs.has(nodeId)) nodeRefs.delete(nodeId);
                            return (
                                <ChildWithRef
                                    // identifiers:
                                    key={nodeId || nodeIndex}
                                    
                                    
                                    
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
                                                
                                                
                                                
                                                // accessibilities:
                                                'aria-readonly' : nodeComponent.props['aria-readonly'] ?? !(
                                                    (limit === Infinity)
                                                    ||
                                                    ((): boolean => {
                                                        const connectionLimit = (allNodes.find(({id}) => (id === nodeId))?.limit ?? Infinity);
                                                        if (connectionLimit === Infinity) return true;
                                                        const connectedCount = (value ?? []).filter(({sideA, sideB}) => (sideA === nodeId) || (sideB === nodeId)).length;
                                                        return (connectionLimit > connectedCount);
                                                    })()
                                                ),
                                                
                                                
                                                
                                                // handlers:
                                                onMouseDown : handleMouseDown,
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
                {cables.map(({sideA, headX, headY, sideB, tailX, tailY}) =>
                    <Cable
                        // identifiers:
                        key={`${sideA}/${sideB}`}
                        
                        
                        
                        // classes:
                        className={!sideB ? 'draft' : undefined}
                        
                        
                        
                        // positions:
                        headX={headX}
                        headY={headY}
                        tailX={tailX}
                        tailY={tailY}
                        
                        
                        
                        // behaviors:
                        precisionLevel={precisionLevel}
                    />
                )}
            </svg>
        </Basic>
    );
};
