import { CanActivate, ExecutionContext, Injectable, NotFoundException, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
/**
 * Marks route as accessible only on local instance
 */
export class LocalEnvGuard implements CanActivate {
	constructor(private readonly configService: ConfigService) {
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		if (!this.configService.get<boolean>('isLocal')) {
			const request: Request = context.switchToHttp().getRequest();

			// Mimics Express default route not found message
			throw new NotFoundException(`Cannot ${request.method.toUpperCase()} ${request.url}`);
		}

		return true;
	}
}
