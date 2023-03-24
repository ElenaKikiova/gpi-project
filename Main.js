import { DrawingArea } from "./DrawingArea.js";
import { KeyPressHandle } from "./KeyPressHandle.js";
import { Toolbox } from "./Toolbox.js";

const SVGArea = new DrawingArea();

const AppToolbox = new Toolbox();

const KeyPress = new KeyPressHandle();


export { SVGArea, AppToolbox, KeyPress };