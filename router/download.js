const Router = require('@koa/router');
const router = new Router();
const fs = require('fs');

router.get('/:id/:displayName', async (ctx) => {
	const { id, displayName } = ctx.params;

	try {
		const file = await $DB.files.findOne({
			where: { id, displayName }
		})
		if(!file) {
			throw new Error("파일이 존재하지 않습니다.")
		}

		const filePath = `${process.env.UPLOAD_PATH}/${file.boardName}/${file.fileName}`;
		if(!fs.existsSync(filePath)) {
			throw new Error("저장된 파일 없습니다.")
		}

		ctx.set('Content-Length', file.size);
		ctx.set('Content-Type', file.mimetype);
		ctx.body = fs.createReadStream(filePath);
		
	} catch (e) {
		console.log(e.message);
		ctx.status = 400;
		ctx.body = 'file not found'
	}
})

module.exports = router;