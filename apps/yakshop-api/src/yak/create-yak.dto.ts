import { YakSex } from 'shared-types';

export class CreateYakDto {
  name: string;
  age: number;
  sex: YakSex;
}

export class CreateYaksDto {
  yaks: CreateYakDto[];
}
