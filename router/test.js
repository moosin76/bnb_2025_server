const Router = require('@koa/router');
const router = new Router();

router.get('/', async (ctx) => {
	const ip = ctx.ipv4
	ctx.body = {
		msg: "API TEST",
		ip,
	}
})

module.exports = router;