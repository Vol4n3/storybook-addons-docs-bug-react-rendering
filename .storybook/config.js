import { addDecorator, addParameters, configure } from "@storybook/react";
import {ThemeDecorator} from './decorator/theme-decorator';


addDecorator(ThemeDecorator);
// automatically import all files ending in *.story.js
configure(require.context("../stories", true, /\.story\.(jsx?|mdx)$/), module);
