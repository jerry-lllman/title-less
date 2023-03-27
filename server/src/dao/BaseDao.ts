import mysql from 'mysql2/promise'
import dbConfig from '../conf/dbConfig'

class BaseDao {
	private static instance: BaseDao = new BaseDao()
	private pool: mysql.Pool

	private constructor() {
		this.pool = mysql.createPool(dbConfig.getConfig())
	}

	public static getInstance(): BaseDao {
		return BaseDao.instance
	}

	public async query<T>(sql: string) {
		const [rows] = await this.pool.execute(sql);
		return rows as T[]
	}

	public async close() {
		await this.pool.end()
	}
}

export default BaseDao.getInstance()
