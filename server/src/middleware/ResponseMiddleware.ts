
import type Koa from 'koa'
import { merge } from 'lodash'
import * as ResponseBodyCreator from '../utils/ResponseBodyCreator'

const responseMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
	merge(ctx, ResponseBodyCreator)

	await next()
}


export default responseMiddleware
