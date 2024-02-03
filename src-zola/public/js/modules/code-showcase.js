const code_showcase = () => {
	let codes = document.querySelectorAll(`code`);

	for (const c of codes) {
		let code = c.innerHTML;
		code = code.replace(/>/g, "&gt;");
		code = code.replace(/</g, "&lt;");

		c.innerHTML = code;
	}
};

export { code_showcase };
