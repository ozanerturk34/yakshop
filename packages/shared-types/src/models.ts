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

export interface XmlHerd {
  herd: {
    labyak: {
      $: {
        name: string;
        age: string;
        sex: string;
      };
    }[];
  };
}

export interface Order {
  milk?: number;
  skins?: number;
}
