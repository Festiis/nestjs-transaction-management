import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @ApiProperty()
  account_id: string;
}
