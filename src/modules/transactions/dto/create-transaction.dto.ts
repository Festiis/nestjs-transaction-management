import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

const message = 'Mandatory body parameters missing or have incorrect type.';
export class CreateTransactionDto {
  @IsUUID(4, {
    message,
  })
  @ApiProperty()
  account_id: string;

  @IsNumber()
  @ApiProperty()
  amount: number;
}
