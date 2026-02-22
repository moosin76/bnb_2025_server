module.exports = async (name, tel) => {

	const user = await $DB.user.findOne({
		attributes: ['email'],
		where: { name, tel }
	})

	if (!user) {
		throw new Error("일치하는 회원정보가 없습니다.")
	}

	return user.email;

}