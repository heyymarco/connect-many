// cssfn:
import {
    // writes css in javascript:
    rule,
    children,
    style,
    scope,
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
    
    
    
    // a responsive management system:
    BreakpointName,
    ifScreenWidthAtLeast,
    ifScreenWidthSmallerThan,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // color options of UI:
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
const breakpoint : BreakpointName = 'xxl';



const usesFrontalViewLayout = () => {
    // dependencies:
    
    // capabilities:
    const {groupableRule} = usesGroupable({
        orientationInlineSelector : null,
        orientationBlockSelector  : null,
        itemsSelector             : null,
    });
    
    // features:
    const {paddingRule} = usesPadding({
        paddingInline : '4rem',
        paddingBlock  : '4rem',
    });
    
    
    
    return style({
        // capabilities:
        ...groupableRule(),
        
        
        
        // layouts:
        ...usesBasicLayout(),
        ...style({
            display: 'grid',
            gridTemplate: [[
                '"header" auto',
                '"identifier" auto',
                '"panels" auto',
                '/',
                '1fr',
            ]],
            ...ifScreenWidthAtLeast(breakpoint, {
                gridTemplate: [[
                    '"header identifier" auto',
                    '"panels identifier" auto',
                    '/',
                    '1fr min-content',
                ]],
            }),
            
            
            
            // borders:
            ...ifScreenWidthAtLeast(breakpoint, {
                borderColor : (colors as any).greyBold,
                borderRadius : '3rem',
                boxShadow : [
                    `inset 0 0 0 1rem ${(colors as any).grey}`,
                    `inset 0 0 0 2rem ${(colors as any).darkBlue}`,
                ],
            }),
            
            
            
            // spacings:
            gapInline : spacers.lg,
            gapBlock  : spacers.lg,
            
            
            
            // children:
            ...children('.header', {
                // positions:
                gridArea: 'header',
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
                justifySelf : 'center',
                ...ifScreenWidthAtLeast(breakpoint, {
                    justifySelf : 'stretch',
                }),
            }),
        }),
        
        
        
        // features:
        ...paddingRule(), // must be placed at the last
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
            
            
            
            // sizes:
            minInlineSize : '12rem',
            
            
            
            // spacings:
            gap: spacers.md,
            
            
            
            // children:
            ...children(['.pid', '.usb'], {
                // accessibilities:
                ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                        // backgrounds:
                    backgroundColor : colors.warning,
                    
                    
                    
                    // foregrounds:
                    color           : colors.warningText,
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
                
                
                
                // sizes:
                alignSelf: 'stretch',
                
                
                
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
    // dependencies:
    
    // capabilities:
    const {groupableVars} = usesGroupable();
    
    
    
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
        
        
        
        // backgrounds & foregrounds:
        ...ifScreenWidthSmallerThan(breakpoint, {
            // accessibilities:
            ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                // backgrounds:
                backgroundColor : (colors as any).darkBlueText,
                
                
                
                // foregrounds:
                color           : (colors as any).darkBlue,
            }),
            
            
            
            // backgrounds:
            backgroundColor : (colors as any).darkBlue,
            
            
            
            // foregrounds:
            color           : (colors as any).darkBlueText,
        }),
        
        
        
        // spacings:
        gapInline : spacers.sm,
        gapBlock  : spacers.xs,
        ...ifScreenWidthSmallerThan(breakpoint, {
            // cancel-out <FrontalView>'s padding with negative margin:
            marginInline     : `calc(0px - ${groupableVars.paddingInline})`, // cancel out <TabBody>'s padding with negative margin
            marginBlockStart : `calc(0px - ${groupableVars.paddingBlock })`, // cancel out <TabBody>'s padding with negative margin
            
            padding          : spacers.default,
        }),
        
        
        
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
