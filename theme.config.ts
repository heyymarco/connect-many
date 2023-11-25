import '@reusable-ui/typos/effects'
import { defineTheme, colorValues, borderValues, borders } from '@reusable-ui/core'

// other libs:
import Color                from 'color'                // color utilities



// Themes:

const primaryCol = Color('#9FA742').lighten(0.8);
defineTheme('primary', primaryCol);

const goldCol = Color('#D19B3E');
defineTheme('gold', goldCol);
// @ts-ignore
colorValues.goldBold = goldCol.darken(1.2);

const cableCol = Color('#0083D0');
defineTheme('cable', cableCol);

const specialCol = Color('#FFD43F');
defineTheme('special', specialCol);

const chocolateCol = Color('#752329');
defineTheme('chocolate', chocolateCol);
// @ts-ignore
colorValues.chocolateBold = chocolateCol.lighten(1.8);

const darkCol = Color('#000000');
defineTheme('dark', darkCol);
// @ts-ignore
colorValues.darkBold = Color('#000000');;

const altDarkCol = Color('#000000');
defineTheme('altDark', altDarkCol);
// @ts-ignore
colorValues.altDarkBold = Color('#3E7BAA');;



// Borders:

borderValues.defaultWidth = '4px';
borderValues.default = [[borders.style, borders.defaultWidth, borders.color]];

