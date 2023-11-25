// cssfn:
import {
    // writes css in javascript:
    rule,
    states,
    children,
    style,
    scope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui core:
import {
    // a color management system:
    colors,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // removes browser's default stylesheet:
    stripoutFocusableElement,
    
    
    
    // background stuff of UI:
    usesBackground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // color options of UI:
    usesThemeable,
}                           from '@reusable-ui/core'    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-content-components:
    usesBasicLayout,
    usesBasicVariants,
    
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
}                           from '@reusable-ui/components'      // a set of official Reusable-UI components

// internals:
import {
    // configs:
    fviews,
}                           from './config'



// defaults:
const minPanelSize   = 500; // 500px



const usesFrontalViewLayout = () => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            display: 'grid',
            gridTemplate: [[
                '"label  identifier" auto',
                '"panels identifier" auto',
                '/',
                '3fr 1fr',
            ]],
            
            
            
            // children:
            ...children('.label', {
                // positions:
                gridArea: 'label',
            }),
            ...children('.panels', {
                // positions:
                gridArea: 'panels',
                
                
                
                // layouts:
                display             : 'grid',
                gridTemplateColumns : `repeat(auto-fill, minmax(${minPanelSize}px, 1fr))`,
                
                
                
                // spacings:
                gap: spacers.lg, 
            }),
            ...children('.identifier', {
                // positions:
                gridArea: 'identifier',
            }),
        }),
    });
};



export default () => [
    scope('frontalView', {
        ...usesFrontalViewLayout(),
    }),
];
