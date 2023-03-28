import { model } from "../defineModel"

class UserDaoDefine {
  static async addUser(userinfo: Userinfo) {
    try {
      const result = await model.create(userinfo)
      return result
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        // 处理唯一性约束错误
        throw new Error('The account already exists')
      } else {
        throw error
      }
    }
  }
}
export const { addUser } = UserDaoDefine

export type Userinfo = {
	user_id: number,
	username: string,
	password: string,
	email: string
}
