import {isText} from "./firstPlace.ts";

describe(
  "is text", () => {
    it(
      "is text", () => {
        expect(isText(["Control", "k"], "Control + k") == true);
      }
    );
  }
);