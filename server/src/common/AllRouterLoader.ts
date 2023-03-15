
import path from 'node:path'
import fs from 'node:fs'
import type Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import koaJSON from 'koa-json'
import globalException from './GlobalException'

class AllRouterLoader {

	app!: Koa

	static allRouterLoader = new AllRouterLoader()

	init(app: Koa) {
		this.app = app
		const rootRouter = this.loadAllRouterWrapper()
		this.app
			.use(globalException) // 全局异常捕获中间件
			.use(rootRouter.routes())
		this.listen()
	}

	getFiles(dir: string) {
		return fs.readdirSync(dir)
	}

	getAbsoluteFilePaths() {
		const dir = path.join(process.cwd(), '/src/router')

		const allFiles = this.getFiles(dir)

		const allFullFilePaths: string[] = []

		for (let file of allFiles) {
			const fullFilePath = path.join(dir, file)
			allFullFilePaths.push(fullFilePath)
		}

		return allFullFilePaths
	}

	loadAllRouterWrapper() {
		// 获取一级路由
		const rootRouter = this.getRootRouter()
		// 获取router文件夹下的所有文件的绝对路径
		const allFullFilePaths = this.getAbsoluteFilePaths()
		// 将二级路由挂载到根路由下
		this.loadAllRouter(allFullFilePaths, rootRouter)
		return rootRouter
	}

	getRootRouter() {
		const rootRouter = new Router()
		rootRouter
			.prefix('/api')
			.use(koaJSON())
			.use(koaBody())

		return rootRouter
	}


	// 自定义守卫
	isRouter(module: any): module is Router {
		return module instanceof Router
	}

	loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
		for (let fullFilePath of allFullFilePaths) {
			const module = require(fullFilePath)
			// 经过自定义守卫判断后可以使用 TS 的类型提示了
			if (this.isRouter(module)) {
				rootRouter.use(
					module.routes(),
					module.allowedMethods()
				)
			}
		}

	}

	listen() {
		this.app.listen(4000, () => { console.log('监听4000端口') })
	}

}

export default AllRouterLoader.allRouterLoader