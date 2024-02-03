const sol_carousel = () => {
	let cars = document.querySelectorAll(`sol-carousel`);

	for (const c of cars) {
		let inner = c.querySelector(`sol-carousel-items`);
		let pos = c.getBoundingClientRect();
		let inner_pos = inner.getBoundingClientRect();
		let middle = pos.width / 2;
		let leading = pos.left - pos.width / 2;
		let max_leading = inner.scrollWidth + leading * 2;
		let start = 0;

		c.addEventListener("mousedown", (event) => {
			start = event.clientX - inner_pos.left;

			c.classList.add(`dragging`);
		});

		c.addEventListener("mousemove", (event) => {
			if (!c.classList.contains(`dragging`)) return;

			let movement = event.movementX;
			let old =
				window
					.getComputedStyle(inner)
					.getPropertyValue(`transform`)
					.split(",")[4] ?? 0;

			console.log(
				old * -1,
				max_leading,
				max_leading + leading * 1.5,
				(max_leading - old * -1) / (old * -1)
			);

			if (old >= (leading / 2) * -1) {
				movement = movement * (old / (leading * -1));
			}

			if (old * -1 >= max_leading + leading * 2) {
				movement = movement * ((max_leading - old * -1) / (old * -1));
			}

			let new_pos = movement + parseInt(old);

			if (new_pos <= leading * -1 && new_pos >= max_leading * -1) {
				inner.style.transform = `translate3d(${new_pos}px, 0, 0)`;
			}
		});

		c.addEventListener("mouseup", (event) => {
			c.classList.remove(`dragging`);
		});

		inner.addEventListener("mouseleave", (event) => {
			c.classList.remove(`dragging`);
		});

		c.addEventListener("touchstart", (event) => {
			start = event.touches[0].clientX;

			c.classList.add(`dragging`);
		});
		c.addEventListener("touchmove", (event) => {
			if (!c.classList.contains(`dragging`)) return;

			let movement = event.touches[0].clientX;
			let old =
				window
					.getComputedStyle(inner)
					.getPropertyValue(`transform`)
					.split(",")[4] ?? 0;
			let easing = 0;

			if (old >= (leading / 2) * -1) {
				easing = (movement - start) * (old / (leading * -1));
			}

			if (old * -1 >= max_leading - pos.left / 2) {
				easing = (movement - start) * (max_leading / (old * -1)) * 0.5;
			}

			let new_pos = movement - start - easing + parseInt(old);
			start = movement;

			if (new_pos <= leading * -1 && new_pos >= max_leading * -1) {
				inner.style.transform = `translate3d(${new_pos}px, 0, 0)`;
			}
		});
		c.addEventListener("touchend", (event) => {
			c.classList.remove(`dragging`);
		});
		inner.addEventListener("mouseleave", () => {
			c.classList.remove(`dragging`);
		});

		window.addEventListener("resize", () => {
			inner = c.querySelector(`sol-carousel-items`);
			pos = c.getBoundingClientRect();
			inner_pos = inner.getBoundingClientRect();
			console.log(inner_pos);
			middle = pos.width / 2;
			leading = pos.left - pos.width / 2;
			max_leading = pos.left + inner_pos.width + leading;
			start = 0;
		});
	}
};

export { sol_carousel };
