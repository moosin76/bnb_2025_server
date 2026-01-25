const jwtUtil = require('../lib/jwtUtil');

module.exports = async (ctx, next) => {
	const token = jwtUtil.getAuthToken(ctx);
	try {
		if (!token) {
			throw new Error("토큰이 없습니다.")
		}
		// console.log('token', token);
		const { email } = jwtUtil.verify(token);
		const user = await $DB.user.findOne({ where: { email }, raw: true })
		// console.log(user);
		ctx.user = user;
		ctx.userToken = token;
	} catch (e) {
		console.log('UserMid Error', e.message);
		ctx.user = null;
		ctx.userToken = null;
	}
	await next();
}