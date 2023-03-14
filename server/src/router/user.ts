import Router from 'koa-router'

const router = new Router()

router.prefix('/userModule')

router.get('/user/:username', async (ctx) => {
	const { username } = ctx.params
	ctx.body = `欢迎${username}`
})

router.post('/user', async ctx => {
	const user = ctx.request.body
	ctx.body = `欢迎${user.username}`
})

module.exports = router
