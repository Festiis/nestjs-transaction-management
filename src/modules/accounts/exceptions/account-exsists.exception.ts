import { BadRequestException } from '@nestjs/common';

export class AccountExsistsExpection extends BadRequestException {
  constructor() {
    super(['Account already created!']);
  }
}
