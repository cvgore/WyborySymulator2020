export default () => ({
	env: process.env.NODE_ENV,

	isLocal: process.env.NODE_ENV !== 'production',

	port: parseInt(process.env.PORT!, 10) || 3850,

	unixPath: process.env.UNIX_PATH,

	app: {
		trustProxy: !!process.env.TRUST_PROXIES,
		name: process.env.APP_NAME || 'WyborySymulator2k20',
		url: process.env.APP_URL,
	},

	crypto: {
		appSecret: process.env.APP_SALT,
		hashidsSecret: process.env.HASHIDS_SALT,
		hcaptchaSecret: process.env.HCAPTCHA_SECRET_KEY,
	},

	db: {
		conn: process.env.DATABASE_CONN || process.env.TYPEORM_CONNECTION,
		host: process.env.DATABASE_HOST || process.env.TYPEORM_HOST,
		user: process.env.DATABASE_USER || process.env.TYPEORM_USERNAME,
		pass: process.env.DATABASE_PASS || process.env.TYPEORM_PASSWORD,
		name: process.env.DATABASE_NAME || process.env.TYPEORM_DATABASE,
		port: parseInt(process.env.DATABASE_PORT! || process.env.TYPEORM_PORT!, 10) || 5432,
		sync: process.env.DATABASE_SYNC || process.env.TYPEORM_SYNCHRONIZE || process.env.NODE_ENV !== 'production'
	},

	redis: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
		db: parseInt(process.env.REDIS_DB!, 10) || 0,
		pass: process.env.REDIS_PASS,
	},

	mail: {
		transport: process.env.MAIL_TRANSPORT,
		from: process.env.MAIL_FROM || '"wyborySim2k20-Local" <ws2k20local@localhost>'
	},

	auth: {
		magicLink: {
			lifetime: parseInt(process.env.AUTH_MAGIC_LIFETIME!, 10) || 60 * 12 // 12 minutes by default
		},
		jwtPeriod: process.env.AUTH_JWT_PERIOD || '15m',
	},

	cookie: {
		secure: !!process.env.COOKIE_SECURE
	},
});
