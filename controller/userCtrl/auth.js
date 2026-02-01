const jwtUtil = require('../../lib/jwtUtil');
const fileUtil = require('../../lib/fileUtil');

module.exports = async (token) => {
	const { email } = jwtUtil.verify(token);
	const user = await $DB.user.findOne({
		attributes: { exclude: ['password'] },
		where: { email }, raw: true
	})

	const photo = await $DB.files.findOne({
		where: {
			userEmail: user.email,
			boardName: 'member',
			type: 'photo'
		}
	})
	user.photo = fileUtil.getFileUrl(photo);
	
	return user;
}