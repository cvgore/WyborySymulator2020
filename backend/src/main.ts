import { ValidationPipe } from '@nestjs/common';

declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

	await app.listen(3000);

	// FIXME: Enable hot reload when https://github.com/ericclemmons/start-server-webpack-plugin/issues/40 is resolved
	// if (module.hot) {
	// 	module.hot.accept();
	// 	module.hot.dispose(() => app.close());
	// }
}

bootstrap();
