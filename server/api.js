const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const initializeAPI = async (app) => {
	app.post(
		"/api/login",
		body("username")
			.notEmpty()
			.withMessage("Username is empty")
			.isEmail()
			.withMessage("Username is not a valid email")
			.escape(),
		body("password")
			.notEmpty()
			.withMessage("Password is empty")
			.isLength(10)
			.withMessage("Password muss be at least 10 characters long")
			.escape(),
		login
	);
};

const login = async (req, res) => {
	const result = validationResult(req);
	if (result.errors.length > 0) {
		return res.status(400).send(`${result.errors[0].msg}<br>`);
	}
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const answer = `
    <h1>Answer</h1>
    <p>Username: ${username}</p>
    <p>Password: ${hashedPassword}</p>
`;

	res.send(answer);
};

module.exports = { initializeAPI };
