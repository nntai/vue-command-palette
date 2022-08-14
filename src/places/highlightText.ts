export const getHighlights = (text: string, highlightText: string) => {
  const regex = new RegExp(highlightText, "g");
  let highlightIndexes: boolean[] = [];
  let arr: { index: number } = { index: 0 };

  for (let i = 0; i < text.length; ++i) {
    highlightIndexes.push(false);
  }

  while (null !== (arr = regex.exec(text)!)) {
    for (let i = arr.index; i < arr.index + highlightText.length; ++i) {
      highlightIndexes[i] = true;
    }
  }

  return highlightIndexes;
};
