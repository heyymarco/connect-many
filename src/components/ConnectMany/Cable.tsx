// react:
import {
    // react:
    default as React,
    useRef,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // base-components:
    GenericProps,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components

// js simulator:
import * as d3 from 'd3'



// types:
interface SimulatorState {
    index : number
    
    x     : number
    y     : number
    
    fx    : number
    fy    : number
    
    vx    : number
    vy    : number
}



// react components:
export interface CableProps extends GenericProps<SVGPathElement> {
    // positions:
    headX : number
    headY : number
    tailX : number
    tailY : number
    
    
    
    // behaviors:
    precisionLevel ?: number
    
    
    
    // pointers:
    pointerPositionRef : React.MutableRefObject<{ x: number, y: number }>
}
export const Cable = (props: CableProps): JSX.Element|null => {
    const {
        // positions:
        headX,
        headY,
        tailX,
        tailY,
        
        
        
        // behaviors:
        precisionLevel = 5,
        
        
        
        // pointers:
        pointerPositionRef,
    ...restGenericProps} = props;
    
    
    
    // refs:
    const pathRef = useRef<SVGPathElement|null>(null);
    
    
    
    // effects:
    const simulatorStateRef  = useRef<SimulatorState[]|null>(null);
    const simulatorEngineRef = useRef<d3.Simulation<SimulatorState, undefined>|null>()
    useIsomorphicLayoutEffect(() => {
        // setups:
        const simulatorState = (
            new Array<null>(Math.max(1, precisionLevel))
            .fill(null)
            .map(() => ({} as SimulatorState))
        );
        
        const firstNodeState = simulatorState[0];
        const lastNodeState  = simulatorState[simulatorState.length - 1];
        
        firstNodeState.fx    = pointerPositionRef.current.x;
        firstNodeState.fy    = pointerPositionRef.current.y;
        
        lastNodeState.fx     = pointerPositionRef.current.x;
        lastNodeState.fy     = pointerPositionRef.current.y;
        
        simulatorStateRef.current = simulatorState;
        
        const simulationNodeDrawer = (
            d3
            .line()
            .x((d: any) => d.x)
            .y((d: any) => d.y)
            .curve(d3.curveBasis)
        );
        
        const nodeLinks = (
            d3
            .pairs(simulatorState)
            .map(([source, target]) => ({ source, target }))
        );
        const simulatorEngine = (
            d3
            .forceSimulation(simulatorState)
            .force('gravity', d3.forceY(2000).strength(0.001)) // simulate gravity
            .force('collide', d3.forceCollide(20)) // simulate cable auto disentanglement (cable nodes will push each other away)
            .force('links'  , d3.forceLink(nodeLinks).strength(0.9)) // string the cables nodes together
            .on('tick', () => {
                const pathElm = pathRef.current;
                if (!pathElm) return;
                
                pathElm.setAttribute('d',
                    simulationNodeDrawer(simulatorState as any) ?? ''
                );
            }) // draw the path on each simulation tick
        );
        simulatorEngineRef.current = simulatorEngine;
        
        
        
        // cleanups:
        return () => {
            simulatorEngine.stop();
        };
    }, [precisionLevel]);
    
    useIsomorphicLayoutEffect(() => {
        const simulatorState = simulatorStateRef.current;
        if (!simulatorState) return;
        
        simulatorState[0].fx = headX;
        simulatorState[0].fy = headY;
    }, [headX, headY]);
    
    useIsomorphicLayoutEffect(() => {
        const simulatorState = simulatorStateRef.current;
        if (!simulatorState) return;
        
        simulatorState[simulatorState.length - 1].fx = tailX;
        simulatorState[simulatorState.length - 1].fy = tailY;
    }, [tailX, tailY]);
    
    const isInitialChange = useRef<boolean>(true);
    useIsomorphicLayoutEffect(() => {
        if (isInitialChange.current) {
            isInitialChange.current = false;
            return;
        } // if
        
        const simulatorState = simulatorStateRef.current;
        if (!simulatorState) return;
        const simulatorEngine = simulatorEngineRef.current;
        if (!simulatorEngine) return;
        
        // measure distance
        const firstNodeState = simulatorState[0];
        const lastNodeState  = simulatorState[simulatorState.length - 1];
        const distance = Math.sqrt(
            Math.pow(lastNodeState.fx - firstNodeState.fx, 2) + Math.pow(lastNodeState.fy - firstNodeState.fy, 2)
        );
        
        // set the link distance
        (simulatorEngine.force('links') as any)?.distance?.(distance / precisionLevel);
        simulatorEngine.alpha(1);
        simulatorEngine.restart();
    }, [headX, headY, tailX, tailY, precisionLevel]);
    
    
    
    // jsx:
    return (
        <path
            {...restGenericProps}
            ref={pathRef}
        />
    );
}