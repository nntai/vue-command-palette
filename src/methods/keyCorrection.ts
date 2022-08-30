export const isCorrectKey = (arr: string[], text: string) => {
  var isIn: boolean = false;
  if (text.toLowerCase() == arr.join("+").toLowerCase()) {
    isIn = true;
  }
  return isIn;
};
