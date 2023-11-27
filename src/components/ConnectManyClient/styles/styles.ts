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
    conncs,
}                           from './config'



const usesConnectManyClientLayout = () => {
    
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(conncs as any);
    const {paddingRule, paddingVars} = usesPadding(conncs);
    
    
    
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
            ...usesCssProps(conncs), // apply config's cssProps
            
            
            
            // spacings:
            padding       : 0,
            
            
            
            // children:
            ...children('.group', {
                // layouts:
                display : 'grid',
                gridTemplate : [[
                    '"ledsStart  label ledsEnd" auto',
                    '"ledsStart  nodes ledsEnd" auto',
                    '/',
                    'auto auto auto',
                ]],
                
                
                
                // borders:
                ...rule(':not(:first-child)', {
                    borderInlineStart: borderVars.border,
                }),
                
                
                
                // children:
                ...children('.label', {
                    // positions:
                    gridArea       : 'label',
                    
                    
                    
                    // layouts:
                    display        : 'grid',
                    justifyContent : 'center',
                    alignContent   : 'center',
                    
                    
                    
                    // spacings:
                    padding : spacers.xs,
                }),
                ...children('.nodes', {
                    // positions:
                    gridArea         : 'nodes',
                    
                    
                    
                    // layouts:
                    display          : 'grid',
                    gridAutoFlow     : 'column',
                    gridTemplateRows : '1fr 1fr',
                    justifyItems     : 'center',
                    alignItems       : 'center',
                    
                    
                    
                    // spacings:
                    gapInline     : paddingVars.paddingInline,
                    gapBlock      : paddingVars.paddingBlock,
                    paddingInline : paddingVars.paddingInline,
                    paddingBlock  : paddingVars.paddingBlock,
                }),
                ...children('.leds', {
                    // positions:
                    ...rule('.plc-start', {
                        gridArea        : 'ledsStart',
                    }),
                    ...rule('.plc-end', {
                        gridArea        : 'ledsEnd',
                    }),
                    alignContent    : 'center',
                    
                    
                    
                    // layouts:
                    display          : 'grid',
                    gridAutoFlow     : 'row',
                    justifyItems     : 'center',
                    alignItems       : 'center',
                    
                    
                    
                    // spacings:
                    gap: spacers.sm,
                    ...rule('.plc-start', {
                        paddingInlineStart : paddingVars.paddingInline,
                    }),
                    ...rule('.plc-end', {
                        paddingInlineEnd : paddingVars.paddingInline,
                    }),
                    paddingBlock  : paddingVars.paddingBlock,
                }),
            }),
            ...children('.menu', {
                // positions:
                position  : 'absolute',
                zIndex    : 99,
                translate : '-50% -50%',
                
                
                
                // layouts:
                display      : 'grid',
                gridAutoFlow : 'column',
                
                
                
                // spacings:
                gap          : spacers.sm,
            }),
        }),
        
        
        
        // features:
        ...borderRule(),  // must be placed at the last
        ...paddingRule(), // must be placed at the last
    });
};
const usesConnectManyClientVariants = () => {

    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(conncs);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
};



const usesConnectorLayout = () => {
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
            
            
            
            // accessibilities:
            userSelect  : 'none',
            
            
            
            // borders:
            borderRadius : '50%',
            
            
            
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
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(conncs, 'connector')), // apply config's cssProps starting with connector***
        }),
    });
};
const usesConnectorVariants = usesControlVariants;
const usesConnectorStates   = usesControlStates;



const usesCablesLayout = () => {
    
    // dependencies:
    
    // features:
    const { borderVars } = usesBorder(conncs as any);
    
    
    
    return style({
        // positions:
        position : 'absolute',
        zIndex   : 98,
        inset    : 0,
        
        
        
        // appearances:
        overflow : conncs.cableOverflow,
        
        
        
        // sizes:
        width   : '100%',
        height  : '100%',
        contain : 'size', // do not take up space if the cable(s) overflowing outside the <ConnectManyClient> component
        
        
        
        // accessibilities:
        ...rule(':not(.hasSelection)', {
            pointerEvents: 'none',
        }),
        ...rule('.hasSelection', {
            pointerEvents: 'auto',
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(conncs, 'backdrop')), // apply config's cssProps starting with backdrop***
        }),
        
        
        
        // borders:
        borderStartStartRadius : `calc(${borderVars.borderStartStartRadius} - ${borderVars.borderWidth})`,
        borderStartEndRadius   : `calc(${borderVars.borderStartEndRadius  } - ${borderVars.borderWidth})`,
        borderEndStartRadius   : `calc(${borderVars.borderEndStartRadius  } - ${borderVars.borderWidth})`,
        borderEndEndRadius     : `calc(${borderVars.borderEndEndRadius    } - ${borderVars.borderWidth})`,
        
        
        
        // animations:
        transition : [
            ['background', '300ms', 'ease-out'],
        ],
    });
};
const usesCablesStates = () => {
    return style({
        // rules:
        ...rule(':not(.dragging)', {
            ...children('path', {
                // accessibilities:
                pointerEvents: 'auto',
            }),
        }),
        ...rule('.dragging', {
            ...children('path', {
                ...rule(':not(.draft)', {
                    // appearances:
                    opacity: conncs.cableOpacityDragging,
                }),
            }),
        }),
    });
};

const usesCableLayout = () => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground();
    
    
    
    return style({
        // resets:
        ...stripoutFocusableElement(), // clear browser's default styles
        
        
        
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
            stroke        : backgroundVars.backgColorFn,
            strokeWidth   : conncs.cableWidth,
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
const usesCableStates = () => {
    return style({
        ...states([
            rule([':hover', ':focus'], {
                strokeWidth : conncs.cableWidthHover,
            }),
            // rule(':focus', {
            //     stroke: 'red',
            // }),
            rule('.unselect', {
                opacity : conncs.cableOpacityBlur,
            }),
        ]),
    });
};



const usesLedLayout = () => {
    
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder(conncs as any);
    
    
    
    return style({
        // layouts:
        display      : 'grid',
        justifyItems : 'center',
        alignItems   : 'center',
        
        
        
        // children:
        ...children('.indicator', {
            // borders:
            border       : borderVars.border,
            borderColor  : colors.dark,
            borderRadius : '50%',
            
            
            
            // children:
            ...children('.led', {
                // sizes:
                inlineSize : '1rem',
                blockSize  : '1rem',
                
                
                
                // borders:
                borderWidth  : 0,
                borderRadius : '50%',
                
                
                
                // spacings:
                padding: 0,
            }),
        }),
    });
};



export default () => [
    scope('connectManyClient', {
        ...usesConnectManyClientLayout(),
        ...usesConnectManyClientVariants(),
    }),
    
    scope('connector', {
        ...usesConnectorLayout(),
        ...usesConnectorVariants(),
        ...usesConnectorStates(),
    }),
    
    scope('cables', {
        ...usesCablesLayout(),
        ...usesCablesStates(),
    }),
    scope('cable', {
        ...usesCableLayout(),
        ...usesCableVariants(),
        ...usesCableStates(),
    }),
    
    scope('led', {
        ...usesLedLayout(),
    }),
];
