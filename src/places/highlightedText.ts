export const getHighlightedIndexes = (resultString: string, searchString: string) => {
    const regex = new RegExp(searchString,'g');
    let matchArr = [];
    const indexPairs = [];
    while (null !== (matchArr = regex.exec(resultString))) {
        indexPairs.push([matchArr.index, regex.lastIndex]);
    }
    console.log(indexPairs);
    console.log(typeof(indexPairs[0]));
    return indexPairs;
  };
  