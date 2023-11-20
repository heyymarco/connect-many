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
        gridTemplate: [[
            '"outputs cables inputs" 1fr',
            '/',
            'auto 1fr auto',
        ]],
        ...children('.outputs', {
            gridArea: 'outputs',
        }),
        ...children('.inputs', {
            gridArea: 'inputs',
        }),
        ...children(['.outputs', '.inputs'], {
            display: 'grid',
            gridAutoRows : '"connector" 1fr',
            gridTemplateColumns: '1fr',
            rowGap: '1rem',
            alignContent: 'space-between',
        }),
        ...children('.cables', {
            position: 'relative',
            gridArea: 'outputs / outputs / inputs / inputs',
            justifySelf: 'stretch',
            alignSelf: 'stretch',
            // pointerEvents: 'none',
            
            ...children('path', {
                fill: 'none',
                strokeWidth: '0.5rem',
                strokeLinecap: 'round',
            }),
        }),
    }, { specificityWeight: 2 }),
];
