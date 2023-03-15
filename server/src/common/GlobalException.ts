
import type Koa from 'koa'
const globalException = async (ctx: Koa.Context, next: Koa.Next) => {

	try {
		await next()
		
	} catch (error: any) {

		ctx.body = `服务器错误${error.message}`
		
	}

}

export default globalException