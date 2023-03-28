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

}
export const { addUser, findAllUser } = UserDaoDefine

export type Userinfo = {
	user_id: number,
	account: string,
	nickname: string,
	password: string,
	email: string,
	address: string,
	created_at: string
}
