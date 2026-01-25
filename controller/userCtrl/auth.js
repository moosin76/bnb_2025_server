const jwtUtil = require('../../lib/jwtUtil');

module.exports = async (token) => {
	const { email } = jwtUtil.verify(token);
	const user = await $DB.user.findOne({ where: { email }, raw: true })
	return user;
}