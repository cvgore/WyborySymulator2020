import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'pgsql',
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [],
			synchronize: process.env.NODE_ENV !== 'production',
		}),
	],controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
