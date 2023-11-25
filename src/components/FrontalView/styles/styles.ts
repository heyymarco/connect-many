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
    
    
    
    // a border (stroke) management system:
    borders,
    borderRadiuses,
    
    
    
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
    defineThemeRule,
}                           from '@reusable-ui/core'    // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-content-components:
    usesBasicLayout,
    usesBasicVariants,
    
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
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
                '1fr min-content',
            ]],
            
            
            
            // spacings:
            gapInline : spacers.lg,
            gapBlock  : spacers.xl,
            
            
            
            // children:
            ...children('.label', {
                // positions:
                gridArea: 'label',
            }),
            ...children('.panels', {
                // positions:
                gridArea: 'panels',
                background: 'blue',
                
                
                
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
const usesFrontalViewVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(fviews);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
};



const usesIdentifierLayout = () => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // layouts:
            display: 'flex',
            flexDirection: 'column',
            justifyContent : 'center', // center vertically
            alignItems: 'center', // center horizontally
            flexWrap: 'nowrap',
            
            
            
            // spacings:
            gap: spacers.md,
            
            
            
            // children:
            ...children(['.pid', '.usb'], {
                // accessibilities:
                    ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                        // backgrounds:
                    backg     : colors.warning,
                    
                    
                    
                    // foregrounds:
                    color     : colors.warningText,
                }),
                
                
                
                // foregrounds:
                color : colors.warning,
                
                
                
                // typos:
                whiteSpace : 'nowrap',
            }),
            ...children('.actions', {
                // layouts:
                display: 'inherit',
                flexDirection: 'inherit',
                justifyContent : 'inherit',
                alignItems: 'stretch', // stretch horizontally
                flexWrap: 'inherit',
                
                
                
                // spacings:
                gap: 'inherit',
            }),
        }),
    });
};
const usesIdentifierVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(fviews);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
        // children:
        ...children(['.pid', '.usb'], {
            ...defineThemeRule('warning'),
        }),
    });
};



const usesActionButtonLayout = () => {
    
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        // layouts:
        ...usesButtonLayout(),
        ...style({
            // borders:
            [borderVars.borderWidth           ] : borders.thin,
            [borderVars.borderStartStartRadius] : borderRadiuses.pill,
            [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
            [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
            [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
        }),
    });
};
const usesActionButtonVariants = usesButtonVariants;
const usesActionButtonStates   = usesButtonStates;



const usesHeaderLayout = () => {
    return style({
        // layouts:
        display: 'grid',
        gridTemplate: [[
            '"logo title serial" auto',
            '"logo  horz   horz" auto',
            '"logo  desc   desc" auto',
            '/',
            'min-content 1fr max-content',
        ]],
        
        
        
        // spacings:
        gapInline : spacers.sm,
        gapBlock  : spacers.xs,
        
        
        
        // children:
        ...children('.logo', {
            // positions:
            gridArea    : 'logo',
            justifySelf : 'center',
            alignSelf   : 'center',
        }),
        ...children('.title', {
            // positions:
            gridArea: 'title',
            justifySelf : 'start',
            alignSelf   : 'end',
            
            
            
            // spacings:
            margin: 0,
        }),
        ...children('.serial', {
            // positions:
            gridArea: 'serial',
            justifySelf : 'end',
            alignSelf   : 'end',
        }),
        ...children('.horz', {
            gridArea: 'horz',
            
            
            
            // appearances:
            opacity: 1,
            
            
            
            // spacings:
            margin: 0,
        }),
        ...children('.description', {
            // positions:
            gridArea: 'desc',
            justifySelf : 'end',
            alignSelf   : 'start',
        }),
    });
};



export default () => [
    scope('frontalView', {
        ...usesFrontalViewLayout(),
        ...usesFrontalViewVariants(),
    }),
    scope('identifier', {
        ...usesIdentifierLayout(),
        ...usesIdentifierVariants(),
    }),
    scope('actionButton', {
        ...usesActionButtonLayout(),
        ...usesActionButtonVariants(),
        ...usesActionButtonStates(),
    }),
    scope('header', {
        ...usesHeaderLayout(),
    }),
];
