export interface Yak {
  name: string;
  age: number;
  sex: YakSex;
  ageLastShaved?: number;
}

export enum YakSex {
  m = "male",
  f = "female",
}
