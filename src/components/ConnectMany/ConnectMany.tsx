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



const CABLE_SEGMENTS = 5;


export interface Connector {
    id   : string|number
    name : string
}
export interface Connections {
    outputs : Connector[],
    inputs  : Connector[],
}
export interface ConnectManyProps extends BasicProps {
    connections : Connections
}
interface Cable {
    data  : string|null
}
export const ConnectMany = (props: ConnectManyProps) => {
    // styles:
    const styleSheet = useConnectManyStyleSheet();
    
    
    
    const {
        connections : {
            outputs,
            inputs,
        },
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
            theme='primary'
            mild={true}
            className={styleSheet.main}
        >
            <div className='outputs'>
                {outputs.map(({name}, index) =>
                    <Basic key={index}>
                        {name}
                    </Basic>
                )}
            </div>
            <div className='inputs'>
                {inputs.map(({name}, index) =>
                    <Basic key={index}>
                        {name}
                    </Basic>
                )}
            </div>
            <svg className='cables' ref={svgRef}>
            </svg>
        </Basic>
    );
};
