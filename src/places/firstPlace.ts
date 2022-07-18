export const isCorrectKey = (arr: string[], text: string) => {
  var isIn: boolean = false;
  if (text == arr.join("+")) {
    isIn = true;
  }
  return isIn;
};
