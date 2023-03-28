import type { PoolOptions } from 'mysql2'

interface EnvConfig {
	development: PoolOptions,
	production: PoolOptions
}

interface ConfigType {
	host: string,
	user: string,
	password: string,
	port: number,
	database: string,
	waitForConnections: boolean,
	connectionLimit: number,
	queueLimit: number,
}

class Config {
	private static instance: Config = new Config()
	private env!: keyof EnvConfig
	private envConfig!: EnvConfig
	private readonly maxConnections = 10
	private readonly baseConfig: ConfigType = {
    host: 'localhost',
    user: 'admin',
    password: '123456',
    port: 3306,
    database: 'server_database',
    waitForConnections: true,
    connectionLimit: this.maxConnections,
    queueLimit: 0,
  };

	private constructor() {
		this.env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
		this.init()
	}

	public static getInstance() {
		return Config.instance
	}

	private init() {
		this.envConfig = {
			development: {
				...this.baseConfig
			},
			production: {
				...this.baseConfig
			}
		}
	}

	getConfig(): ConfigType;
	getConfig<Key extends keyof ConfigType>(key: Key): ConfigType[Key];
	getConfig<Key extends keyof ConfigType>(key?: Key): any {
		return key ? this.envConfig[this.env][key] : this.envConfig[this.env]
	}

}

export default Config.getInstance()