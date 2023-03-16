import Koa from 'koa'

import autoRegisterRouter from './middleware/autoRegisterRouter'
import globalException from './middleware/globalException'
import ResponseMiddleware from './middleware/responseMiddleware'

const app = new Koa()

app.use(ResponseMiddleware)
app.use(globalException) // 全局异常捕获中间件


autoRegisterRouter.init(app) // 自动注册路由

