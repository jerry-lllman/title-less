import { createRouter } from "../utils/RouterCreator"
import logger from "../utils/logger"
import userDao from "../dao/UserDao"
import { addUser, Userinfo } from "../dao/UserDaoDefine"
const router = createRouter()

router.prefix('/userModule')

router.get('/user/:username', async (ctx) => {
	logger.debug('进入 user get')
	const { username } = ctx.params
	// @ts-ignore
	// 全局错误捕获中间件会捕获到这个错误
	// username.a.a.a = 1
	ctx.success(`Welcome ${username}`, 'OK')
})

router.get('/user/:account/:password', async (ctx) => {
	logger.debug('进入 user get111')
	const { account, password } = ctx.params
	const [res] = await userDao.findUserinfo(account, password)
	if (res) {
		ctx.success(res)
	} else {
		const errorMessage = `Not found user account '${account}'. Please try again`
		ctx.fail(errorMessage)
	}
})

router.post('/user', async ctx => {
	const userinfo: Userinfo = ctx.request.body
	const dbUserinfo = await addUser(userinfo)
	console.log(dbUserinfo)
	ctx.success(dbUserinfo)
})

module.exports = router
