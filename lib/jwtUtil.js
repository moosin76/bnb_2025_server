const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const create = (payload) => {
	const token = jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 기본 하루
		...payload,
	}, SECRET);
	return token;
}

const verify = (token) => {

}

module.exports = {
	create, verify
}