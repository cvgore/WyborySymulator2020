import { IsDateString, IsOptional, IsString, Length } from 'class-validator';
import { IsDateAfterProp } from '@/core/validation-rules/IsDateAfterProp';

export default class EditPollDto {
	@IsString()
	@Length(3, 40)
	name!: string;

	@IsOptional()
	@IsDateString()
	validFrom!: Date | undefined;

	@IsOptional()
	@IsDateString()
	@IsDateAfterProp('validFrom')
	validUntil!: Date | undefined;
}
