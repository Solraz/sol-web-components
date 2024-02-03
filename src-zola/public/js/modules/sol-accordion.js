const sol_accordion = () => {
	let accs = document.querySelectorAll(`sol-accordion > sol-accordion-item`);

	for (const a of accs) {
		a.addEventListener("click", () => {
			let others = a.parentElement.querySelector(`.active`);

			if (others !== a) {
				others?.classList.remove(`active`);
			}

			a.classList.toggle(`active`);
		});
	}
};

export { sol_accordion };
