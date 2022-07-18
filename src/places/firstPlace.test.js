import { expect, it } from "vitest";
import { isCorrectKey } from "./firstPlace.ts";

describe(
  "is text", () => {
    it(
      "is text", () => {
        expect(isCorrectKey(["Control", "k"], "Control+k") === true);
      }
    );

    it("is text", () => {
      expect(isCorrectKey(["Control", "k"], "Control k") === false);
    });
  }
);