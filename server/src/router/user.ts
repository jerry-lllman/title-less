import Router from 'koa-router'

const router = new Router()

router.prefix('/userModule')

router.get('/user/:username', async (ctx) => {
	const { username } = ctx.params
	// // @ts-ignore
	// 全局错误捕获中间件会捕获到这个错误
	// username.a.a.a = 1

	ctx.body = `欢迎${username}`
})

router.post('/user', async ctx => {
	const user = ctx.request.body
	ctx.body = `欢迎${user.username}`
})

module.exports = router
