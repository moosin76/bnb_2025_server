const moment = require('moment');
const { Op } = require('sequelize');
const pwUtil = require('../../lib/pwUtil');

module.exports = async ({ email, token, tempPw, password }) => {

	// TODO: expireAt 현재 시간보다 작은거는 삭제 하자
	await $DB.user_pw_reset.destroy({
		where: {
			expireAt: { [Op.lt]: moment().format('YYYY-MM-DD HH:mm:ss') }
		}
	})

	// 1. email, token, tempPw 하고 expireAt이 현재 시간보다 크면 사용가능한거다.
	const info = await $DB.user_pw_reset.findOne({
		where: {
			email,
			token,
			tempPw,
			expireAt:{[Op.gte]: moment().format('YYYY-MM-DD HH:mm:ss')}
		}
	})

	if (!info) {
		throw new Error("초기화 정보가 올바르지 않거나 만료되었습니다.")
	}

	// 한번 읽은건 삭제 합시다.
	await $DB.user_pw_reset.destroy({
		where: {
			id: info.id
		}
	})

	// 2. 일치하는 정보가 있으면 password를 hash로 만들고
	const hash = await pwUtil.hashPassword(password);

	// 3. user 정보를 업데이트 하자
	const [cnt] = await $DB.user.update({ password: hash }, {
		where: {
			email
		}
	});

	return cnt == 1;
}