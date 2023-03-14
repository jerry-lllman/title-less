import Koa from 'koa'
import Router from 'koa-router'


// import userRouter from './router/user'

import allRouterLoader from './common/AllRouterLoader'

const app = new Koa()

allRouterLoader.init(app)

const router = new Router()



router.get('/test', async (ctx) => {
	ctx.body = '测试页面'
})

// router.use(
// 	// userRouter.routes(),
// 	// userRouter.allowedMethods()
// ).allowedMethods()

// app
// 	.use(router.routes())
// 	.listen(4000)

