import { Op, Sequelize } from "sequelize"
import { model } from "../defineModel"

class UserDaoDefine {
	static instance: UserDaoDefine = new UserDaoDefine()
	async addUser(userinfo: Userinfo) {
		return model.create(userinfo)
	}

	async findAllUser() {
		return model.findAll({
			raw: true // 仅展示原始数据即可，可防止 log 数据太杂乱的干扰
		})
	}

	// 投影查询
	async findByAttr() {
		return model.findAll({
			raw: true,
			attributes: ['account', 'nickname']
		})
	}

	// and 或者 or 查询
	async findByAccountAndPassword(account: string, password: string) {
		return model.findOne({
			raw: true,
			where: {
				[Op.and]: [
					{ account },
					{ password }
				]
			}
		})
	}

	// 模糊查询
	async findFuzzyByName(name: string) {
		const searchKey = `%${name}%`
		return model.findAll({
			raw: true,
			where: {
				nickname: {
					[Op.like]: searchKey
				}
			}
		})
	}

	// 组合查询
	async combinedQuery() {
		return model.findAll({
			raw: true,
			group: "address", // 3. 将数据根据 address 进行分组
			attributes: ["address", [Sequelize.fn('count', Sequelize.col('password')), 'total']], // 2. 查询字段 为 address 和 根据 password = "123456"计算出来的 total(count 别名)
			where: {
				// 1. 从表中查询 password = "123456" 的数据
				password: "123456"
			}
		})
		// 上面这段等价于 SQL 语句：
		// SELECT address, count(password) as total FROM users where password=123456 GROUP BY address
	}

	async findUserWithPager(params: {page: number, pageSize: number}) {
		const { page,  pageSize} = params
		return model.findAll({
			raw: true,
			limit: pageSize,
			offset: page
		})

	}
}

export default UserDaoDefine.instance

// export const { addUser, findAllUser, findByAttr, findByAccountAndPassword, findFuzzyByName } = UserDaoDefine

export type Userinfo = {
	user_id: number,
	account: string,
	nickname: string,
	password: string,
	email: string,
	address: string,
	created_at: string
}
