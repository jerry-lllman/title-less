interface DBConnectConfig {
	host: string
	user: string
	password: string
	port: number
	database: string
}

interface EnvConfig {
	development: DBConnectConfig,
	production: DBConnectConfig
}

class Config {
	static config: Config = new Config()
	private env!: keyof EnvConfig
	private envConfig!: EnvConfig
	private constructor() {
		this.env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
		this.init()
	}

	private init() {
		this.envConfig = {
			development: {
				host: 'localhost',
				user: 'admin',
				password: '123456',
				port: 3306,
				database: 'server-db'
			},
			production: {
				host: 'localhost',
				user: 'root',
				password: '123456',
				port: 3306,
				database: 'server-db'
			}
		}
	}

	getConfig(): DBConnectConfig;
	getConfig<Key extends keyof DBConnectConfig>(key: Key): DBConnectConfig[Key];
	getConfig<Key extends keyof DBConnectConfig>(key?: Key): any {
		return	key ? this.envConfig[this.env][key] : this.envConfig[this.env]
	}

}

export default Config.config