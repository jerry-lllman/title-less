
import type Koa from 'koa'
import { CustomContext } from '../typings'
import logger from '../utils/logger'

const globalException = async (ctx: Koa.Context & CustomContext, next: Koa.Next) => {
	logger.info('进入全局异常捕获中间件')
	try {
		await next()
	} catch (error: any) {
		ctx.fail(`Server Error: ${error.message}`)
	}
}

export default globalException