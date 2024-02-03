const show_component = () => {
	let shows = document.querySelectorAll(
		`show-component .show-component-nav > *`
	);

	for (const s of shows) {
		s.addEventListener("click", () => {
			let others = s.parentElement.querySelector(`.active`);
			let container = s.parentElement.parentElement.querySelector(
				`container[${s.dataset.show}]`
			);
			let other_containers =
				s.parentElement.parentElement.querySelectorAll(`container`);

			if (others !== s) {
				others?.classList.remove(`active`);
			}

			for (const c of other_containers) {
				if (c !== container) {
					c.classList.remove(`active`);
				}
			}

			s.classList.add(`active`);
			container.classList.add(`active`);
		});
	}
};

export { show_component };
