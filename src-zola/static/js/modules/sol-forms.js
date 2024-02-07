const sol_form_validation = () => {
	let inputs = document.querySelectorAll(`.sol-form-input`);

	for (const i of inputs) {
		i.addEventListener("invalid", (e) => {
			console.log(e);
		});
	}
};

export { sol_form_validation };
