import Userinfo from "../model/UserInfo"
import { isEmpty } from "lodash"
import BaseDao from "./BaseDao"


class UserDao {
	static userDao: UserDao = new UserDao()
	findUserinfo(username: string, password: string) {
		let sql = `select * from users where 1=1`
		if (!isEmpty(username)) {
			sql += ` and username='${username}'`
		}
		if (!isEmpty(password)) {
			sql += ` and password='${password}'`
		}

		return BaseDao.query<Userinfo>(sql)
	}
}

export default UserDao.userDao