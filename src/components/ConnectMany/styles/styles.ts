// cssfn:
import {
    // writes css in javascript:
    rule,
    children,
    style,
    scope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
    
    
    
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
    conns,
}                           from './config'



const usesConnectManyLayout = () => {
    
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(conns as any);
    const {paddingRule, paddingVars} = usesPadding(conns);
    
    
    
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // positions:
            position     : 'relative', // important to detect pointer coordinate correctly
            
            
            
            // layouts:
            display      : 'grid',
            gridAutoFlow : 'column',
            
            
            
            // customize:
            ...usesCssProps(conns), // apply config's cssProps
            
            
            
            // spacings:
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
            
            
            
            // children:
            ...children('.group', {
                // layouts:
                display : 'grid',
                
                
                
                // borders:
                border : borderVars.border,
                ...rule(':not(:first-child)', {
                    borderInlineStartWidth: 0,
                }),
                
                
                
                // children:
                ...children('.label', {
                    // layouts:
                    display        : 'grid',
                    justifyContent : 'center',
                    alignContent   : 'center',
                    
                    
                    
                    // spacings:
                    padding : spacers.xs,
                }),
                ...children('.nodes', {
                    // layouts:
                    display          : 'grid',
                    gridAutoFlow     : 'column',
                    gridTemplateRows : '1fr 1fr',
                    justifyItems     : 'center',
                    alignItems       : 'center',
                    
                    
                    
                    // spacings:
                    gap     : '0.5em',
                    padding : '0.5em',
                }),
            }),
            ...children('.cables', {
                // positions:
                position : 'absolute',
                zIndex   : 99,
                inset    : 0,
                
                
                
                // sizes:
                width  : '100%',
                height : '100%',
                
                
                
                // accessibilities:
                pointerEvents: 'none',
            }),
            
            
            
            // rules:
            ...rule(':not(.dragging)', {
                ...children('.cables', {
                    ...children('path', {
                        // accessibilities:
                        pointerEvents: 'auto',
                    }),
                }),
            }),
            ...rule('.dragging', {
                ...children('.cables', {
                    ...children('path', {
                        ...rule(':not(.draft)', {
                            // appearances:
                            opacity: conns.cableOpacityDragging,
                        }),
                    }),
                }),
            }),
        }),
        
        
        
        // features:
        ...borderRule(),  // must be placed at the last
        ...paddingRule(), // must be placed at the last
    });
};
const usesConnectManyVariants = () => {

    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(conns);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
};



const usesCircleConnectionLayout = () => {
    return style({
        // layouts:
        ...usesControlLayout(),
        ...style({
            // layouts:
            display        : 'grid',
            justifyContent : 'center',
            alignContent   : 'center',
            
            
            
            // appearances:
            overflow    : 'hidden',
            
            
            
            // sizes:
            inlineSize  : '2em',
            aspectRatio : '1 / 1',
            
            
            
            // accessibilities:
            userSelect  : 'none',
            
            
            
            // borders:
            borderRadius : '50%',
            borderWidth  : '2px',
            
            
            
            // spacings:
            padding: 0,
            
            
            
            // rules:
            ...rule('.dodrop', {
                // accessibilities:
                cursor : 'crosshair'
            }),
            ...rule(':not(:is(.dodrop, .nodrop, [aria-disabled]:not([aria-disabled="false"]), [aria-readonly]:not([aria-readonly="false"])))', {
                // accessibilities:
                cursor : 'move',
            }),
            ...rule(':is(.nodrop, [aria-disabled]:not([aria-disabled="false"]), [aria-readonly]:not([aria-readonly="false"]))', {
                // accessibilities:
                cursor : 'not-allowed',
            }),
        }),
    });
};
const usesCircleConnectionVariants = usesControlVariants;
const usesCircleConnectionStates   = usesControlStates;



const usesCableLayout = () => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground();
    
    
    
    return style({
        // layouts:
        ...style({
            // appearances:
            filter: [[
                'drop-shadow(0 0 2px rgba(0,0,0,0.8))'
            ]],
            
            
            
            // accessibilities:
            cursor: 'pointer',
            ...rule('.draft', {
                pointerEvents: 'none',
            }),
            
            
            
            // backgrounds:
            fill : 'none',
            
            
            
            // borders:
            stroke          : backgroundVars.backgColorFn,
            strokeWidth     : conns.cableWidth,
            ...rule(':hover', {
                strokeWidth : conns.cableWidthHover,
            }),
            strokeLinecap : 'round',
        }),
        
        
        
        // features:
        ...backgroundRule(), // must be placed at the last
    });
};
const usesCableVariants = () => {
    // dependencies:
    
    // variants:
    const {themeableRule} = usesThemeable();
    
    
    
    return style({
        // variants:
        ...themeableRule(),
    });
};



export default () => [
    scope('connectMany', {
        ...usesConnectManyLayout(),
        ...usesConnectManyVariants(),
    }),
    
    scope('circleConnection', {
        ...usesCircleConnectionLayout(),
        ...usesCircleConnectionVariants(),
        ...usesCircleConnectionStates(),
    }),
    
    scope('cable', {
        ...usesCableLayout(),
        ...usesCableVariants(),
    }),
];
