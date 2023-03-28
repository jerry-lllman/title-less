import { Op } from "sequelize"
import { model } from "../defineModel"

class UserDaoDefine {
	static async addUser(userinfo: Userinfo) {
		return model.create(userinfo)
	}

	static async findAllUser() {
		return model.findAll({
			raw: true // 仅展示原始数据即可，可防止 log 数据太杂乱的干扰
		})
	}

	// 投影查询
	static async findByAttr() {
		return model.findAll({
			raw: true,
			attributes: ['account', 'nickname']
		})
	}

	// 
	static async findByAccountAndPassword(account: string, password: string) {
		return model.findOne({
			raw: true,
			where: {
				[Op.and]: [
					{account},
					{password}
				]
			}
		})
	}

}
export const { addUser, findAllUser, findByAttr, findByAccountAndPassword } = UserDaoDefine

export type Userinfo = {
	user_id: number,
	account: string,
	nickname: string,
	password: string,
	email: string,
	address: string,
	created_at: string
}
