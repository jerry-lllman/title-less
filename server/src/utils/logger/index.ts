import log4js from "log4js";

enum LevelInfo {
	TRACE = 'trace',
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
	FATAL = 'fatal'
}

class LogUtil {
	static logUtil: LogUtil = new LogUtil()
	logInstance!: log4js.Logger
	private constructor() {
		this.config()
	}
	config() {
		log4js.configure({
			appenders: {
				console: { type: 'console' },
				debug_file: { type: 'file', filename: 'loggers/debug/debug.log' },
				info_file: {
					type: 'dateFile',
					filename: 'loggers/info/info',
					pattern: 'yyyy-MM-dd.log',
					encoding: 'utf-8',
					alwaysIncludePattern: true
				},
				warn_file: {
					type: 'dateFile',
					filename: 'loggers/warn/warn',
					pattern: 'yyyy-MM-dd.log',
					encoding: 'utf-8',
					alwaysIncludePattern: true
				},
				error_file: {
					type: 'dateFile',
					filename: 'loggers/error/error',
					pattern: 'yyyy-MM-dd.log',
					encoding: 'utf-8',
					alwaysIncludePattern: true
				},
				fatal_file: {
					type: 'dateFile',
					filename: 'loggers/fatal/fatal',
					pattern: 'yyyy-MM-dd.log',
					encoding: 'utf-8',
					alwaysIncludePattern: true
				},
			},
			categories: {
				default: {
					appenders: ['console', 'debug_file'],
					level: LevelInfo.DEBUG
				},
				info: {
					appenders: ['console', 'info_file'],
					level: LevelInfo.INFO
				},
				warn: {
					appenders: ['console', 'warn_file'],
					level: LevelInfo.WARN
				},
				error: {
					appenders: ['console', 'error_file'],
					level: LevelInfo.ERROR
				},
				fatal: {
					appenders: ['console', 'fatal_file'],
					level: LevelInfo.FATAL
				}
			}
		})
	}

	getCategories(level: LevelInfo) {
		this.logInstance = log4js.getLogger(level)
	}

	debug(input: string) {
		this.getCategories(LevelInfo.DEBUG)
		this.logInstance.debug(input)
	}

	info(input: string) {
		this.getCategories(LevelInfo.INFO)
		this.logInstance.info(input)
	}

	warn(input: string) {
		this.getCategories(LevelInfo.WARN)
		this.logInstance.warn(input)
	}

	error(input: string) {
		this.getCategories(LevelInfo.ERROR)
		this.logInstance.error(input)
	}

	fatal(input: string) {
		this.getCategories(LevelInfo.FATAL)
		this.logInstance.fatal(input)
	}
}

export default LogUtil.logUtil