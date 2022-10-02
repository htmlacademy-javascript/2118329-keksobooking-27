// Реализация на основании статьи Math.random() на MDN

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    const storage = max;
    max = min;
    min = storage;
  }
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}

// Реализация основана на статье https://bobbyhadz.com/blog/javascript-get-random-float-in-range

function getRandomFloat(min, max, decimals) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    const storage = max;
    max = min;
    min = storage;
  }
  const topLimit = 0.1 ** decimals;
  const rangeLength = max - min + topLimit;
  return parseFloat(
    (Math.random() * (Math.floor(rangeLength * 10 ** decimals) / (10 ** decimals)) + min).toFixed(decimals)
  );
}

getRandomInt(1, 10);
getRandomFloat(2.1, 2.2, 2);
