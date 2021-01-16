import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import e, { Express } from 'express';
// import session from 'express-session';
import { ConfigService } from '@nestjs/config';
// import ConnectRedis from 'connect-redis';
// import { createClient } from 'redis';
import passport from 'passport';
import { EntityNotFoundFilter } from '@/core/filters/entity-not-found.filter';

declare const module: any;

// Creates an application and runs it asynchronously
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: false,
		}),
	);

	app.useGlobalFilters(
		new EntityNotFoundFilter()
	);

	const config: ConfigService = app.get(ConfigService);

	// app.use(
	// 	session({
	// 		secret: config.get<string>('crypto.appSecret')!,
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		cookie: {
	// 			httpOnly: true,
	// 			maxAge: 12 * 60 * 60,
	// 			secure: config.get<boolean>('cookie.secure'),
	// 		},
	// 		name: 'ws2k20_sess',
	// 		store: new (ConnectRedis(session))({
	// 			ttl: 12 * 60 * 60,
	// 			client: createClient({
	// 				host: config.get<string>('redis.host'),
	// 				port: config.get<number>('redis.port'),
	// 				db: config.get<number>('redis.db')! + 1,
	// 				password: config.get<string>('redis.pass'),
	// 			})
	// 		})
	// 	}),
	// );

	// Remove unwanted X-Powered-By header
	const express: Express = app.getHttpAdapter().getInstance();
	express.disable('x-powered-by');

	if (config.get('app.trustProxy')) {
		express.set('trust proxy', 1);
	}

	app.use(
		rateLimit({
			windowMs: 1 * 60 * 1000,
			max: 100,
			skip(req: e.Request): boolean {
				// Need to exclude /user/login/{authorize,request} routes
				// to prevent double counting requests
				const excludes = {'/user/login/authorize': 1, '/user/login/request': 2};

				return req.url in excludes;
			}
		})
	);

	app.use(passport.initialize());

	await app.listen(config.get('unixPath')! || config.get('port')!);

	// FIXME: Enable hot reload when https://github.com/ericclemmons/start-server-webpack-plugin/issues/40 is resolved
	// if (module.hot) {
	// 	module.hot.accept();
	// 	module.hot.dispose(() => app.close());
	// }
}

bootstrap();
