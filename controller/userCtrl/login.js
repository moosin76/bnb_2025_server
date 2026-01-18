const pwUtil = require('../../lib/pwUtil');
const jwtUtil = require('../../lib/jwtUtil');
const moment = require('moment');

module.exports = async (email, password, connectedIp) => {

	// email 에 해당하는 user정보를 가져온다
	const user = await $DB.user.findOne({
		where: {
			email,
		},
		raw: true,
	})

	if (!user) { 	// 없으면 에러
		throw new Error("회원정보가 존재하지 않습니다.")
	}

	console.log(user);
	// 있으면 비밀번호가 맞는지 확인한다.
	const comp = await pwUtil.comparePassword(password, user.password);
	if (!comp) {
		throw new Error("비밀번호가 올바르지 않습니다.")
	}
	delete user.password

	// 맞으면 회원정보를 줄때 JWT도 함께 발급을 하자
	const token = jwtUtil.create({ email });

	// user 접속정보를 기록하자
	const updatePayload = {
		connectedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
		connectedIp,
	}
	await $DB.user.update(updatePayload, {where:{email}});

	user.connectedAt = updatePayload.connectedAt;
	user.connectedIp = connectedIp;
	
	return { user, token }
}