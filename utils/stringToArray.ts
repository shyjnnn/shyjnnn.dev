function stringToArray(inputString: string) {
  const resultArray = inputString.split(',');

  const trimmedArray = resultArray.map((item) => item.trim());

  return trimmedArray;
}

export { stringToArray };
