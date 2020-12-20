import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GoogleRecaptchaValidator } from '../services/google-recaptcha.validator';
import { GoogleRecaptchaGuardOptions } from '../interfaces/google-recaptcha-guard-options';
import { RECAPTCHA_OPTIONS, RECAPTCHA_RESPONSE_PROVIDER } from '../provider.declarations';
import { GoogleRecaptchaException } from '..';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GoogleRecaptchaGuard implements CanActivate {
    constructor(private readonly validator: GoogleRecaptchaValidator,
                private readonly reflector: Reflector,
                @Inject(RECAPTCHA_OPTIONS) private readonly options: GoogleRecaptchaGuardOptions) {
    }

    async canActivate(context: ExecutionContext): Promise<true | never> {
        const request = context.switchToHttp().getRequest();

        const skip = typeof this.options.skipIf === 'function'
            ? await this.options.skipIf(request)
            : !!this.options.skipIf;

        if (skip) {
            return true;
        }

        const provider = this.reflector.get(RECAPTCHA_RESPONSE_PROVIDER, context.getHandler());

        const response = provider
            ? await provider(request)
            : await this.options.response(request);

        const result = await this.validator.validate(response);

        if (result.success) {
            return true;
        }

        throw new GoogleRecaptchaException(result.errors);
    }
}
