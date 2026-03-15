const randToken = require('rand-token');
const moment = require('moment');
const fs = require('fs');

module.exports = async (email, tel) => {

	// console.log(email)
	// 1.이메일로 회원정보를 가져온다.
	const user = await $DB.user.findOne({
		where: { email, tel }
	});

	if (!user) { // 2.없으면 에러
		throw new Error("존제하지 않는 회원입니다.")
	}

	// 3. 있으면 난수를 하나 생성해서 DB에 저장 16-32 /find-pw?token=ksjlajklsjflaj&email=test@com
	const token = randToken.generate(32);
	// 4. 임시 비번 하나 생성 6자리 001010 -> hash
	const tempPw = randToken.generate(6).toUpperCase();

	// 5. 링크의 유효 시간은 30분 expire 걸고
	const expireAt = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
	// 6. user_pw_reset DB에 저장
	const row = await $DB.user_pw_reset.create({
		email,
		token,
		tempPw,
		expireAt
	})

	// 7. 회원에게 이메일을 발송 template 파일도 만들고
	let html = fs.readFileSync(__dirname + '/findPwTemplate.html', { encoding: 'utf-8' });

	// template 파일 정보 변경하기

	const link = `${process.env.HOME_URL}/pw-reset?token=${token}&email=${email}`
	html = html.replaceAll('{{name}}', user.name);
	html = html.replaceAll('{{tempPw}}', tempPw);
	html = html.replaceAll('{{link}}', link);
	html = html.replaceAll('\"', '"');
	// 메일발송
	const result = await $SEND_MAIL(email, `${user.name}님 비밀번호 초기화 안내`, html);

	if (!result) {
		throw new Error("메일 발송에 실패 하였습니다.")
	}

	return true;
}