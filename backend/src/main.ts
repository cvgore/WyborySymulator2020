import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import e from 'express';

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

	// Remove unwanted X-Powered-By header
	app.getHttpAdapter().getInstance().disable('x-powered-by');

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

	await app.listen(3000);

	// FIXME: Enable hot reload when https://github.com/ericclemmons/start-server-webpack-plugin/issues/40 is resolved
	// if (module.hot) {
	// 	module.hot.accept();
	// 	module.hot.dispose(() => app.close());
	// }
}

bootstrap();
