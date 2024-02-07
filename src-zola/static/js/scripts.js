import {
	miltimer,
	queuer_preparator,
	throttle,
	debounce,
} from "./modules/performance.js";
import { init_component_states } from "./modules/sol-components.js";

import { show_component } from "./modules/show-component.js";
import { code_showcase } from "./modules/code-showcase.js";

import { sol_accordion } from "./modules/sol-accordion.js";
import { sol_carousel } from "./modules/sol-carousel.js";
import { sol_form_validation } from "./modules/sol-forms.js";

window.addEventListener("load", () => {
	miltimer();
	queuer_preparator();
	window.throttler = throttle;
	window.debouncer = debounce;
	init_component_states();

	show_component();
	code_showcase();

	sol_accordion();
	sol_carousel();
	sol_form_validation();
});
