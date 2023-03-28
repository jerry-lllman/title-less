import Userinfo from "../model/UserInfo"
import { isEmpty } from "lodash"
import BaseDao from "./BaseDao"


class UserDao {
	static userDao: UserDao = new UserDao()
	findUserinfo(account: string, password: string) {
		let sql = `select * from users where 1=1`
		if (!isEmpty(account)) {
			sql += ` and account='${account}'`
		}
		if (!isEmpty(password)) {
			sql += ` and password='${password}'`
		}

		return BaseDao.query<Userinfo>(sql)
	}
}

export default UserDao.userDao