import { expect, it } from "vitest";
import { isCorrectKey } from "./firstPlace.ts";

describe(
  "is correct key", () => {
    it(
      "is correct key", () => {
        expect(isCorrectKey(["Control", "k"], "Control+k") === true);
      }
    );

    it("is correct key", () => {
      expect(isCorrectKey(["Control", "k"], "Control k") === false);
    });
  }
);