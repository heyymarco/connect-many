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
export const ConnectMany = (props: ConnectManyProps) => {
    // styles:
    const styleSheet = useConnectManyStyleSheet();
    
    
    
    const {
        // configs:
        connections,
        
        
        
        // components:
        defaultNodeComponent = <CircleConnection /> as React.ReactComponentElement<any, React.HTMLAttributes<HTMLElement>>,
    ...restBasicProps} = props;
    
    
    
    const svgRef = useRef<SVGSVGElement|null>(null);
    // const [cables, setCables] = useState<Cable[]>(() => []);
    // const cablesRef = useRef<Cable[]>(cables);
    // cablesRef.current = cables;
    // const [, triggerRender] = useState<{}>({});
    
    useEffect(() => {
        const svgElm = svgRef.current;
        if (!svgElm) return;
        const svg = d3.select(svgElm);
        
        
        
        // Draws a line out of the simulation points
        const simulationNodeDrawer = d3
            .line()
            .x((d: any) => d.x)
            .y((d: any) => d.y)
            .curve(d3.curveBasis);
        
        
        let lastCable: d3.Selection<SVGPathElement, unknown, null, undefined>|undefined = undefined;
        
        d3.select(document)
        .on('mousedown', (mouseEvent) => {
            const cable = svg.append('path').attr('stroke', '#ff0000');
            
            const nodes = d3.range(CABLE_SEGMENTS).map(() => ({} as {
                index : number
                
                x     : number
                y     : number
                
                fx    : number
                fy    : number
                
                vx    : number
                vy    : number
            }));
            
            const links = d3
                .pairs(nodes)
                .map(([source, target]) => ({ source, target }));
            
            nodes[0].fx = mouseEvent.offsetX;
            nodes[0].fy = mouseEvent.offsetY;
            
            const sim = d3
                .forceSimulation(nodes)
                .force('gravity', d3.forceY(2000).strength(0.001)) // simulate gravity
                .force('collide', d3.forceCollide(20)) // simulate cable auto disentanglement (cable nodes will push each other away)
                .force('links', d3.forceLink(links).strength(0.9)) // string the cables nodes together
                .on('tick', () => {
                    cable.attr('d', (d: any) =>
                        simulationNodeDrawer(d.nodes)
                    );
                    // triggerRender({});
                }); // draw the path on each simulation tick
            
            cable.datum({nodes, sim});
            
            lastCable = cable;
        })
        .on('mousemove', (mouseEvent) => {
            if (!lastCable) return;
            
            
            
            const {
                nodes,
                sim,
            } = lastCable.datum() as any;
            const start = nodes[0];
            const end = nodes[nodes.length - 1];
            
            end.fx = mouseEvent.offsetX;
            end.fy = mouseEvent.offsetY;
            
            // measure distance
            const distance = Math.sqrt(
                Math.pow(end.fx - start.fx, 2) + Math.pow(end.fy - start.fy, 2)
            );
            
            // set the link distance
            sim.force('links').distance(distance / CABLE_SEGMENTS);
            sim.alpha(1);
            sim.restart();
        })
        .on('mouseup', () => {
            lastCable = undefined;
        });
    }, []);
    
    
    
    return (
        <Basic
            {...restBasicProps}
            className={styleSheet.main}
        >
            {Object.entries(connections).map(([key, {label: groupName, nodes}]) =>
                <div key={key} className='group'>
                    {!!groupName && <div className='label'>{groupName}</div>}
                    <div className='nodes'>
                        {nodes.map(({id, label, limit, nodeComponent = defaultNodeComponent}, index) =>
                            React.cloneElement(nodeComponent,
                                // props:
                                {
                                    key : id || index,
                                },
                                
                                
                                
                                // children:
                                nodeComponent.props.children ?? label,
                            )
                        )}
                    </div>
                </div>
            )}
            <svg className='cables' ref={svgRef}>
            </svg>
        </Basic>
    );
};
