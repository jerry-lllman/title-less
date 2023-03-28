
import { Sequelize, DataTypes } from "sequelize"
import { sequelize } from "../dao/BaseDaoDefine"

class Userinfo {
	static createModel() {
		const model = sequelize.define(
			'users',
			{
				user_id: {
					type: DataTypes.INTEGER,
					field: 'user_id', // 可选，表中字段，不填写则为对象名
					primaryKey: true,// 是否主键
					autoIncrement: true// 是否自增长
				},
				account: {
					type: DataTypes.STRING(50),
					allowNull: false,
					// unique: true, // 该值是否必须唯一
					unique: {
						name: 'unique_account', // 设置约束名称
						msg: 'Account already exists' // 设置错误提示信息
					},
				},
				nickname: {
					type: DataTypes.STRING(90),
					allowNull: false
				},
				password: {
					type: DataTypes.STRING(255),
					allowNull: false
				},
				email: {
					type: DataTypes.STRING(255),
					allowNull: false
				},
				address: {
					type: DataTypes.STRING(255),
					allowNull: true
				},
				created_at: {
					type: DataTypes.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}
			},
			{
				freezeTableName: false, // true 表示使用给定的表名，false 表示模型名后加 s 作为表名
				timestamps: false // true 表示给模型加上时间戳属性
			}
		)

		model.sync({ force: false }) // force 为 true 则表示如果表存在则先删除后创建，为 false 表示不存在则创建该表
		return model
	}

}


export const model = Userinfo.createModel()