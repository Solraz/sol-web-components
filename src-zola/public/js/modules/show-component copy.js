const show_component = () => {
	let shows = document.querySelectorAll(
		`show-component .show-component-nav > *`
	);

	for (const s of shows) {
		s.addEventListener("click", () => {
			let others = s.parentElement.querySelector(`.active`);

			if (others !== s) {
				others.classList.remove(`active`);
			}

			s.classList.add(`active`);
		});
	}
};

export { show_component };
