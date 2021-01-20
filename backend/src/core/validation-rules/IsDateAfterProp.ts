import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsDateAfterProp(compareTo: string, validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'fulfillsPasswordComplexity',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				defaultMessage(): string {
					return `$property must be at a date after ${compareTo}`;
				},
				validate(value: any): boolean {
					if (!value || !object[compareTo]) {
						return true;
					}

					const date = +Date.parse(value);

					return date > +Date.parse(object[compareTo]);
				},
			},
		});
	};
}

