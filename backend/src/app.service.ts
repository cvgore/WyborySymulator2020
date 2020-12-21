import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
	show(): string {
		return 'jebana kontrola bledow';
	}
}
