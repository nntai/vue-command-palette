export const getHighlightedIndexes = (resultString: string, searchString: string) => {
    const regex = new RegExp(searchString,'g');
    let matchArr:RegExpExecArray|null;
    const indexPairs = [];
    while (null !== (matchArr = regex.exec(resultString))) {
        indexPairs.push([matchArr.index, regex.lastIndex]);
    }
    return indexPairs;
  };
  