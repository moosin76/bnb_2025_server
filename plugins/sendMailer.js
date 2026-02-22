const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'naver',
	host: 'smtp.naver.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS
	}
});

const sendMail = async function (to, subject, html) {
	try {
		if (!to || !subject || !html) {
			throw new Error("메일 보내기 정보가 부족합니다.");
		}

		const info = await transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject,
			html,
		})

		// console.log("----------메일발송 성공")
		// console.log(info);
		// console.log("--------------------")
		return info;
	} catch (e) {
		console.error(e);
		return false;
	}
}

module.exports = sendMail;