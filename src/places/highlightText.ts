export const getHighlightIndexes = (text: string, highlightText: string) => {
  const regex = new RegExp(highlightText, "g");
  const highlightIndexes: number[][] = [];
  let arr: { index: number } = {
    index: 0,
  };

  while (null !== (arr = regex.exec(highlightText)!)) {
    highlightIndexes.push([arr.index, regex.lastIndex]);
  }

  return highlightIndexes;
};

export const isHighlighted = (index: number, highlightArr: number[][]) => {
  let isIndexIncluded: boolean = false;
  for (let i: number = 0; i < highlightArr.length; ++i) {
    if (index >= highlightArr[i][0] && index < highlightArr[i][1]) {
      isIndexIncluded = true;
    }
  }

  return isIndexIncluded;
};
