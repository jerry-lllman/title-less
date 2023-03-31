import { createRouter } from "../utils/RouterCreator"
import logger from "../utils/logger"
import userDao from "../dao/UserDao"
import { addUser, findAllUser, findByAccountAndPassword, findByAttr, findFuzzyByName, Userinfo } from "../dao/UserDaoDefine"
const router = createRouter()

router.prefix('/userModule')

// router.get('/user/:username', async (ctx) => {
// 	logger.debug('进入 user get')
// 	const { username } = ctx.params
// 	// @ts-ignore
// 	// 全局错误捕获中间件会捕获到这个错误
// 	// username.a.a.a = 1
// 	ctx.success(`Welcome ${username}`, 'OK')
// })

// router.get('/user/:account/:password', async (ctx) => {
// 	logger.debug('进入 user get111')
// 	const { account, password } = ctx.params
// 	// 使用手写sql
// 	const [res] = await userDao.findUserinfo(account, password)
// 	if (res) {
// 		ctx.success(res)
// 	} else {
// 		const errorMessage = `Not found user account '${account}'. Please try again`
// 		ctx.fail(errorMessage)
// 	}
// })


router.get('/user/find/all', async (ctx) => {
	logger.info('查询所有用户')
	const res = await findAllUser()
	ctx.success(res)
})

// 1. 投影查询示例
router.get('/user/findBy', async ctx => {
	const res = await findByAttr()
	ctx.success(res)
})

// 2. or and 查询，这里只做了 and
router.post('/user/info', async ctx => {
	const { account, password } = ctx.request.body
	const res = await findByAccountAndPassword(account, password)
	if (res) {
		ctx.success(res)
	} else {
		ctx.fail(`The account does not exist or the account password does not match`)
	}
})

// 3. 模糊查询
router.get('/user/fuzzy/:nickname', async ctx => {
	const { nickname } = ctx.params
	const res = await findFuzzyByName(nickname)
	ctx.success(res)
})

// 4. 聚合查询


// 5. 分页查询

router.post('/user', async ctx => {
	const userinfo: Userinfo = ctx.request.body
	// 使用 sequelize
	const dbUserinfo = await addUser(userinfo)
	console.log(dbUserinfo)
	ctx.success(dbUserinfo)
})

module.exports = router
