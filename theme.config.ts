import { defineTheme, colorValues } from '@reusable-ui/core'

// other libs:
import Color                from 'color'                // color utilities



// Theme:

const primaryCol = Color('#9FA742').lighten(0.8);
defineTheme('primary', primaryCol);

const goldCol = Color('#D19B3E');
defineTheme('gold', goldCol);
// @ts-ignore
colorValues.goldBold = goldCol.darken(0.8);

const cableCol = Color('#0083D0');
defineTheme('cable', cableCol);

const specialCol = Color('#FFD43F');
defineTheme('special', specialCol);

