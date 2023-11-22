'use client'

// react:
import {
    // react:
    default as React,
    useEffect,
    useRef,
    useState,
}                           from 'react'
import { BasicProps, Basic, ContentProps, Content } from '@reusable-ui/components'
import { useConnectManyStyleSheet } from './styles/loader'
import * as d3 from 'd3'
import { CircleConnection } from './CircleConnection'
import { ChildWithRef } from './ChildWithRef'
import { useEvent } from '@reusable-ui/core'



const CABLE_SEGMENTS = 5;


export interface ConnectionNode {
    id             : string|number
    label         ?: React.ReactNode
    limit         ?: number
    nodeComponent ?: React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>
}
export type ConnectionGroup = {
    label ?: React.ReactNode
    nodes  : ConnectionNode[]
}
export type ConnectionConfig = {
    [key in string] : ConnectionGroup
}
export interface ConnectManyProps extends BasicProps {
    // configs:
    connections    : ConnectionConfig
    
    
    
    // components:
    defaultNodeComponent ?: React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>
}
interface NodeState {
    index : number
    
    x     : number
    y     : number
    
    fx    : number
    fy    : number
    
    vx    : number
    vy    : number
}
export const ConnectMany = (props: ConnectManyProps): JSX.Element|null => {
    // styles:
    const styleSheet = useConnectManyStyleSheet();
    
    
    
    const {
        // configs:
        connections,
        
        
        
        // components:
        defaultNodeComponent = <CircleConnection /> as React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const [nodeRefs] = useState<Map<React.Key, Element|null>>(() => new Map<React.Key, Element|null>());
    const svgRef = useRef<SVGSVGElement|null>(null);
    
    useEffect(() => {
        const svgElm = svgRef.current;
        if (!svgElm) return;
        const svg = d3.select(svgElm);
        
        
        
        // Draws a line out of the simulation points
        const simulationNodeDrawer =
            d3
            .line()
            .x((d: any) => d.x)
            .y((d: any) => d.y)
            .curve(d3.curveBasis);
        
        
        let lastCable: d3.Selection<SVGPathElement, unknown, null, undefined>|undefined = undefined;
        
        d3.select(document)
        .on('mousedown', (mouseEvent) => {
            const cable = svg.append('path').attr('stroke', '#ff0000');
            
            const nodeStates     = (new Array(CABLE_SEGMENTS)).fill(null).map(() => ({} as NodeState));
            const firstNodeState = nodeStates[0];
            const lastNodeState  = nodeStates[nodeStates.length - 1];
            
            firstNodeState.fx    = pointerPositionRef.current.x;
            firstNodeState.fy    = pointerPositionRef.current.y;
            
            lastNodeState.fx     = pointerPositionRef.current.x;
            lastNodeState.fy     = pointerPositionRef.current.y;
            
            const nodeLinks =
                d3
                .pairs(nodeStates)
                .map(([source, target]) => ({ source, target }));
            
            const simulator =
                d3
                .forceSimulation(nodeStates)
                .force('gravity', d3.forceY(2000).strength(0.001)) // simulate gravity
                .force('collide', d3.forceCollide(20)) // simulate cable auto disentanglement (cable nodes will push each other away)
                .force('links'  , d3.forceLink(nodeLinks).strength(0.9)) // string the cables nodes together
                .on('tick', () => {
                    cable.attr('d', simulationNodeDrawer(nodeStates as any));
                }); // draw the path on each simulation tick
            
            cable.datum({nodeStates, simulator});
            
            lastCable = cable;
        })
        .on('mousemove', (mouseEvent) => {
            if (!lastCable) return;
            
            
            
            const {
                nodeStates,
                simulator,
            } = lastCable.datum() as any;
            const firstNodeState = nodeStates[0];
            const lastNodeState  = nodeStates[nodeStates.length - 1];
            
            lastNodeState.fx = pointerPositionRef.current.x;
            lastNodeState.fy = pointerPositionRef.current.y;
            
            // measure distance
            const distance = Math.sqrt(
                Math.pow(lastNodeState.fx - firstNodeState.fx, 2) + Math.pow(lastNodeState.fy - firstNodeState.fy, 2)
            );
            
            // set the link distance
            simulator.force('links').distance(distance / CABLE_SEGMENTS);
            simulator.alpha(1);
            simulator.restart();
        })
        .on('mouseup', () => {
            lastCable = undefined;
        });
    }, []);
    
    
    
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
            {...restBasicProps}
            className={styleSheet.main}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {Object.entries(connections).map(([groupKey, {label: groupName, nodes}], groupIndex) =>
                <div key={groupKey} className='group'>
                    {!!groupName && <div className='label'>{groupName}</div>}
                    <div className='nodes'>
                        {nodes.map(({id, label, limit, nodeComponent = defaultNodeComponent}, nodeIndex) => {
                            const nodeId = `${groupIndex}/${nodeIndex}`;
                            
                            
                            
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
            </svg>
        </Basic>
    );
};
