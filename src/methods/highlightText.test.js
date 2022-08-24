import { describe, expect, it } from "vitest";
import { getHighlightIndexes, isHighlighted } from "./highlightText.ts";

describe(
  "highlight text",
  () => {
    it(
      "highlight text", () => {
        expect((getHighlightIndexes("place places", "place")[0][0] === 0) === true);
        expect((getHighlightIndexes("place places", "place")[0][1] === 5) === true);
      }
    );

    it(
      "highlight text", () => {

        expect(isHighlighted(0, [[0, 4]]) === true);
      }
    );
  }
);