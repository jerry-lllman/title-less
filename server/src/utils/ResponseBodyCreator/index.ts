import type Koa from 'koa'

enum Code {
	SUCCESS = 200,
	SERVER_ERROR = 500
}

export class ResponseBodyCreator {

	private static baseResponse(ctx: Koa.Context, code: Code, msg: any, data?: any) {
		ctx.body = {
			code,
			data,
			msg
		}
	}

	static success(this: Koa.Context, data: any = undefined, msg?: any) {
		ResponseBodyCreator.baseResponse(this, Code.SUCCESS, msg, data)
	}

	static fail(this: Koa.Context, msg?: any) {
		ResponseBodyCreator.baseResponse(this, Code.SERVER_ERROR, msg)
	}
}

export const { success, fail } = ResponseBodyCreator