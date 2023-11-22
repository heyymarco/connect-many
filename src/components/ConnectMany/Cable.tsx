'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
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
        
        // update head & tail:
        firstNodeState.fx = headX;
        firstNodeState.fy = headY;
        lastNodeState.fx  = tailX;
        lastNodeState.fy  = tailY;
        
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
        
        // measure distance between head & tail:
        const distance = Math.sqrt(
            Math.pow(lastNodeState.fx - firstNodeState.fx, 2) + Math.pow(lastNodeState.fy - firstNodeState.fy, 2)
        );
        (simulatorEngine.force('links') as any)?.distance?.(distance / precisionLevel);
        
        
        
        // cleanups:
        return () => {
            simulatorEngine.stop();
        };
    }, [precisionLevel]);
    
    const isInitialChange = useRef<boolean>(true);
    useIsomorphicLayoutEffect(() => {
        // ignore first update:
        if (isInitialChange.current) {
            isInitialChange.current = false;
            return;
        } // if
        
        const simulatorState = simulatorStateRef.current;
        if (!simulatorState) return;
        const simulatorEngine = simulatorEngineRef.current;
        if (!simulatorEngine) return;
        
        const firstNodeState = simulatorState[0];
        const lastNodeState  = simulatorState[simulatorState.length - 1];
        
        // update head & tail:
        firstNodeState.fx = headX;
        firstNodeState.fy = headY;
        lastNodeState.fx  = tailX;
        lastNodeState.fy  = tailY;
        
        // measure distance between head & tail:
        const distance = Math.sqrt(
            Math.pow(lastNodeState.fx - firstNodeState.fx, 2) + Math.pow(lastNodeState.fy - firstNodeState.fy, 2)
        );
        (simulatorEngine.force('links') as any)?.distance?.(distance / precisionLevel);
        
        // update simulator:
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