// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component




// configs:
export const [conns, connValues, cssConnConfig] = cssConfig(() => {
    const bases = {
        // backgrounds:
        backdropBackground   : 'rgba(0,0,0, 0.5)'       as CssKnownProps['background'   ],
        
        
        
        // borders:
        cableWidthSm         : '0.2rem'                 as CssKnownProps['strokeWidth'  ],
        cableWidthMd         : '0.3rem'                 as CssKnownProps['strokeWidth'  ],
        cableWidthLg         : '0.35rem'                as CssKnownProps['strokeWidth'  ],
        cableWidthHoverSm    : '0.3rem'                 as CssKnownProps['strokeWidth'  ],
        cableWidthHoverMd    : '0.4rem'                 as CssKnownProps['strokeWidth'  ],
        cableWidthHoverLg    : '0.45rem'                as CssKnownProps['strokeWidth'  ],
        cableOpacityDragging : 0.7                      as CssKnownProps['opacity'      ],
        cableOpacityBlur     : 0.3                      as CssKnownProps['opacity'      ],
        
        
        
        // spacings:
        paddingInlineSm      : spacers.sm               as CssKnownProps['paddingInline'],
        paddingBlockSm       : spacers.sm               as CssKnownProps['paddingBlock' ],
        paddingInlineMd      : spacers.md               as CssKnownProps['paddingInline'],
        paddingBlockMd       : spacers.md               as CssKnownProps['paddingBlock' ],
        paddingInlineLg      : spacers.lg               as CssKnownProps['paddingInline'],
        paddingBlockLg       : spacers.lg               as CssKnownProps['paddingBlock' ],
    };
    
    
    
    const defaults = {
        // borders:
        cableWidth           : bases.cableWidthMd       as CssKnownProps['strokeWidth'  ],
        cableWidthHover      : bases.cableWidthHoverMd  as CssKnownProps['strokeWidth'  ],
        
        
        
        // spacings:
        paddingInline        : bases.paddingInlineMd    as CssKnownProps['paddingInline'],
        paddingBlock         : bases.paddingBlockMd     as CssKnownProps['paddingBlock' ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'conn' });
