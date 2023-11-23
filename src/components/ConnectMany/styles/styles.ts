// cssfn:
import {
    // writes css in javascript:
    rule,
    descendants,
    children,
    style,
    scope,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borders,
    borderRadiuses,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // a responsive management system:
    breakpoints,
    ifScreenWidthAtLeast,
    ifScreenWidthSmallerThan,
    
    
    
    // a typography management system:
    typos,
    horzRules,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
}                           from '@reusable-ui/core'    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-content-components:
    containers,
    contents,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components



export default () => [
    scope('main', {
        display: 'grid',
        gridAutoFlow : 'column',
        position: 'relative', // important to detect pointer coordinate correctly
        ...children('.group', {
            border: 'solid 1px red',
            display: 'grid',
            gap: '0.5rem',
            
            ...children('.label', {
                display: 'grid',
                justifyContent: 'center',
                alignContent: 'center',
            }),
            ...children('.nodes', {
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows: '1fr 1fr',
                gap: '0.5rem',
                padding: '0.5rem',
                justifyItems: 'center',
                alignItems: 'center',
            }),
        }),
        ...children('.cables', {
            position: 'absolute',
            zIndex  : 99,
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            
            ...children('path', {
                pointerEvents: 'auto',
                fill: 'none',
                stroke: '#ff0000',
                strokeWidth: '0.3rem',
                strokeLinecap: 'round',
                cursor: 'pointer',
                ...rule([':hover', '.draft'], {
                    opacity: 0.5,
                }),
                ...rule('.draft', {
                    pointerEvents: 'none',
                }),
                filter: [[
                    'drop-shadow(0 0 2px rgba(0,0,0,0.8))'
                ]],
            }),
        }),
    }, { specificityWeight: 2 }),
    
    scope('circleConnection', {
        borderRadius: '50%',
        borderWidth : '2px',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'hidden',
        inlineSize: '2em',
        aspectRatio: '1 / 1',
        padding: 0,
        userSelect: 'none',
        ...rule(':not([aria-readonly="true"])', {
            cursor: 'move',
        }),
        ...rule('[aria-readonly="true"]', {
            cursor: 'not-allowed',
        }),
    }, { specificityWeight: 2 }),
];
