import dbConfig from "../conf/dbConfig"
import { Dialect } from "sequelize"
import { Sequelize } from "sequelize-typescript"


class BaseDaoDefine {
	private static instance = new BaseDaoDefine()
	sequelize!: Sequelize
	constructor() {
		this.init('mysql')
	}

	init(dialect: Dialect) {
		const { host, user, password, database, port } = dbConfig.getConfig()
		this.sequelize = new Sequelize(database, user, password, {
			host,
			port,
			dialect,
			define: {
				timestamps: false,
				freezeTableName: true
			}
		})
	}

	static getInstance() {
		return BaseDaoDefine.instance
	}

}

export const { sequelize } = BaseDaoDefine.getInstance()