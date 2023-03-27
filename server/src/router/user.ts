import { createRouter } from "../utils/RouterCreator"
import logger from "../utils/logger"
import userDao from "../dao/UserDao"
const router = createRouter()

router.prefix('/userModule')

router.get('/user/:username', async (ctx) => {
	logger.debug('进入 user get')
	const { username } = ctx.params
	// @ts-ignore
	// 全局错误捕获中间件会捕获到这个错误
	// username.a.a.a = 1
	ctx.success(`欢迎${username}`, 'OK')
})

router.get('/user/:username/:password', async (ctx) => {
	logger.debug('进入 user get111')
	const { username, password } = ctx.params
	const [res] = await userDao.findUserinfo(username, password)
	console.log(res)
	ctx.success(res)
})

router.post('/user', async ctx => {
	const user = ctx.request.body
	ctx.body = `欢迎${user.username}`
})

module.exports = router
