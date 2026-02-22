module.exports = async (email) => {

	// 1.이메일로 회원정보를 가져온다.

	// 2.없으면 에러

	// 3. 있으면 난수를 하나 생성해서 DB에 저장 16-32 /find-pw?token=ksjlajklsjflaj&email=test@com

	// 4. 임시 비번 하나 생성 6자리 001010 -> hash

	// 5. 링크의 유효 시간은 30분 expire 걸고

	// 6. 회원에게 이메일을 발송 template 파일도 만들고

	// const result = await $SEND_MAIL([email, 'moosin76@naver.com'], '테스트 발송2', "<h1>메일 발송 테스트2</h1>")

	// if(!result) {
	// 	throw new Error("메일 발송에 실패 하였습니다.")
	// }

	return true;
}