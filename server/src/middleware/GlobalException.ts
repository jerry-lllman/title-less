
import type Koa from 'koa'
import { CustomContext } from '../typings'

const globalException = async (ctx: Koa.Context & CustomContext, next: Koa.Next) => {
	try {
		await next()
	} catch (error: any) {
		ctx.fail(`服务器错误${error.message}`)
	}
}

export default globalException