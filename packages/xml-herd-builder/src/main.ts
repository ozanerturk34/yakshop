import { readFileSync } from "fs";
import { parseString } from "xml2js";
import type { Yak, XmlHerd } from "shared-types";

export class HerdBuilder {
  yaks: Yak[];

  /**
   * @param {string} path - Relative path of the xml file to extract the data from
   */
  constructor(path: string) {
    const data = readFileSync(path);
    parseString(data, this.yakCreatorCallback);
  }

  private flatten(xml: XmlHerd): Yak[] {
    return xml.herd.labyak.map(
      ({ $: { age, ...rest } }) =>
        ({
          ...rest,
          age: Number(age),
        }) as Yak
    );
  }

  private yakCreatorCallback = (err: Error, result: any) => {
    if (err) {
      console.error(err);
      throw new Error(err.message);
    }
    this.yaks = this.flatten(result);
    console.log("Yaks", this.yaks);
    console.log("Done");
  };
}
