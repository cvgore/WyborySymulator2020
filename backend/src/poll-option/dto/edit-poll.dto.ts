import { IsDateString, IsString, Length } from 'class-validator';
import { IsDateAfterProp } from '@/core/validation-rules/IsDateAfterProp';

export default class EditPollDto {
	@IsString()
	@Length(3, 40)
	name!: string;

	@IsDateString()
	validFrom!: Date | null;

	@IsDateString()
	@IsDateAfterProp('validFrom')
	validUntil!: Date | null;
}
