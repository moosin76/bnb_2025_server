module.exports = async(email) => {
	const cnt = await $DB.user.count({
		where: {
			email
		}
	})
	return cnt == 0;
}