const dragging_touch = (
	carousel,
	inner,
	leading,
	max_leading,
	number,
	event
) => {
	if (!carousel.classList.contains(`dragging`)) return;

	let movement = event.touches[0].clientX;
	let old =
		window
			.getComputedStyle(inner)
			.getPropertyValue(`transform`)
			.split(",")[4] ?? 0;
	let easing = 0;

	if (old >= (leading / 2) * -1) {
		easing =
			(movement - window.sol_components["carousel"][number]["start"]) *
			(old / (leading * -1));
	}

	if (old * -1 >= max_leading + leading) {
		easing =
			(movement - window.sol_components["carousel"][number]["start"]) *
			((max_leading - old * -1) / (old * -1));
	}

	let new_pos =
		movement -
		window.sol_components["carousel"][number]["start"] -
		easing +
		parseInt(old);

	if (new_pos <= leading * -1 && new_pos >= max_leading * -1) {
		inner.style.transform = `translate3d(${new_pos}px, 0, 0)`;
	}
	window.sol_components["carousel"][number]["start"] = movement;
};

const dragging = (carousel, inner, leading, max_leading, event) => {
	if (!carousel.classList.contains(`dragging`)) return;

	let movement = event.movementX;
	let old =
		window
			.getComputedStyle(inner)
			.getPropertyValue(`transform`)
			.split(",")[4] ?? 0;

	if (old >= (leading / 2) * -1) {
		movement = movement * (old / (leading * -1));
	}

	if (old * -1 >= max_leading + leading) {
		movement = movement * ((max_leading - old * -1) / (old * -1));
	}

	let new_pos = movement + parseInt(old);

	if (new_pos <= leading * -1 && new_pos >= max_leading * -1) {
		inner.style.transform = `translate3d(${new_pos}px, 0, 0)`;
	}
};

const click_up_or_leave = (carousel, event) => {
	carousel.classList.remove(`dragging`);
};

const click_down = (carousel, number, inner_pos, event) => {
	window.sol_components["carousel"][number]["start"] = event.touches
		? event.touches[0].clientX
		: event.clientX - inner_pos.left;

	carousel.classList.add(`dragging`);
};

const carousel_event_listener = (carousel, number) => {
	let inner = carousel.querySelector(`sol-carousel-items`);
	let pos = carousel.getBoundingClientRect();
	let inner_pos = inner.getBoundingClientRect();
	// let middle = pos.width / 2;
	let leading = pos.left - pos.width / 2;
	let max_leading = inner.scrollWidth + leading * 3;
	window.sol_components["carousel"][number]["start"] = 0;

	carousel.addEventListener(
		"mousemove",
		dragging.bind(null, carousel, inner, leading, max_leading),
		false
	);

	carousel.addEventListener(
		"mousedown",
		click_down.bind(null, carousel, number, inner_pos),
		false
	);
	carousel.addEventListener(
		"mouseup",
		click_up_or_leave.bind(null, carousel),
		false
	);
	inner.addEventListener(
		"mouseleave",
		click_up_or_leave.bind(null, carousel),
		false
	);

	carousel.addEventListener(
		"touchmove",
		dragging_touch.bind(null, carousel, inner, leading, max_leading, number),
		false
	);
	carousel.addEventListener(
		"touchstart",
		click_down.bind(null, carousel, number, inner_pos),
		false
	);
	carousel.addEventListener(
		"touchend",
		click_up_or_leave.bind(null, carousel),
		false
	);
	inner.addEventListener(
		"touchleave",
		click_up_or_leave.bind(null, carousel),
		false
	);
};

const sol_carousel = () => {
	let cars = document.querySelectorAll(`sol-carousel`);

	if (!window.sol_components["carousel"])
		window.sol_components["carousel"] = [];

	for (let i = 0; i < cars.length; i++) {
		if (!window.sol_components["carousel"][i])
			window.sol_components["carousel"][i] = {};

		carousel_event_listener(cars[i], i);

		window.addEventListener("resize", () => {
			let inner = cars[i].querySelector(`sol-carousel-items`);
			let pos = cars[i].getBoundingClientRect();
			let inner_pos = inner.getBoundingClientRect();
			// let middle = pos.width / 2;
			let leading = pos.left - pos.width / 2;
			let max_leading = inner.scrollWidth + leading;
			window.sol_components.carousel[i].start = 0;

			carousel.addEventListener(
				"mousemove",
				dragging.bind(null, carousel, inner, leading, max_leading),
				false
			);
			carousel.addEventListener(
				"touchmove",
				dragging_touch.bind(null, carousel, inner, leading, max_leading, start),
				false
			);
		});
	}
};

export { sol_carousel };
