const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const create = (payload) => {
	const token = jwt.sign({
		// exp: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 기본 하루
		...payload,
	}, SECRET);
	return token;
}

const verify = (token) => {
	const decoded = jwt.verify(token, SECRET);
	return decoded;
}

const getAuthToken = ({ request }) => {
	let token = null;
	if (request.headers.authorization) {
		const arr = request.headers.authorization.split(' ');
		if (arr[0].toLowerCase() == 'bearer') {
			token = arr[1];
		}
	}
	return token;
}

module.exports = {
	create, verify, getAuthToken
}