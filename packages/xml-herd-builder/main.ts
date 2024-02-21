import { readFile } from "fs";
import { parseString } from "xml2js";
import { type Yak } from "shared-types";

export class InitialHerd {
  yaks: Yak[];
  constructor() {
    readFile(`./data/herd.xml`, (err, data) => {
      if (err) {
        console.error(err);
        throw new Error(err.message);
      }
      parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          throw new Error(err.message);
        }
        console.log(result);
        console.log("Done");
        this.yaks = result;
      });
    });
  }
}
