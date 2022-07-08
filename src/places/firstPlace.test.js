import { expect, it } from "vitest";
import {isText} from "./firstPlace.ts";

describe(
  "is text", () => {
    it(
      "is text", () => {
        expect(isText(["Control", "k"], "Control+k") == true);
      }
    );

    it("is text", () => {
      expect(isText(["Control", "k"], "Control k") == false);
    });
  }
);