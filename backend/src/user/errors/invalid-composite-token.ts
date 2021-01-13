import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCompositeToken extends HttpException {
	constructor() {
		super('Composite token is invalid', HttpStatus.BAD_REQUEST);
	}
}
