import { show_component } from "./modules/show-component.js";
import { sol_accordion } from "./modules/sol-accordion.js";
import { sol_carousel } from "./modules/sol-carousel.js";
import { code_showcase } from "./modules/code-showcase.js";

window.addEventListener("load", () => {
	show_component();
	code_showcase();
	sol_accordion();
	sol_carousel();
});
