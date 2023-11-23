import { defineTheme } from '@reusable-ui/core'

// other libs:
import Color                from 'color'                // color utilities



// Theme:

const primaryCol = Color('#9FA742').lighten(0.5);
defineTheme('primary', primaryCol);

const goldCol = Color('#D19B3E');
defineTheme('gold', goldCol);

const cableCol = Color('#8B4EF0');
defineTheme('cable', cableCol);

const brokenCol = Color('#323232').lighten(0.9);
defineTheme('broken', brokenCol);

