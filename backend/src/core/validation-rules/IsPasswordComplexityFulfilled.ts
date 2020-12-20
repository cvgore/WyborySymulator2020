import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordComplexityFulfilled(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'fulfillsPasswordComplexity',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				defaultMessage(): string {
					return '$property must be at least 8 characters long, ' +
						'must contain at least one lower case and one upper case letter, ' +
						'must contain at least one digit';
				},
				validate(value: any): Promise<boolean> {
					return checkPasswordComplexity(value);
				},
			},
		});
	};
}

// Checks if certain password fulfils complexity rules
// Currently, a password must:
// - 8 chars long
// - contain at least one lower case and upper case letter
// - contain at least one digit
export function checkPasswordComplexity(value: any): Promise<boolean> {
	return new Promise((resolve) => {
		const result = typeof value === 'string'
			&& value.trim().length >= 8
			&& value.match(/[a-z]/) !== null
			&& value.match(/[A-Z]/) !== null
			&& value.match(/[0-9]/) !== null;

		return resolve(result);
	});
}
