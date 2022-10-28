const DIVISION_BASE = 0.1;

const MULTIPLICATION_BASE = 10;

// Реализация на основании статьи Math.random() на MDN

const getRandomInt = (min, max) => {

  if (min < 0 || max < 0) {
    return NaN;
  }

  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  return Math.floor(
    Math.random() * (upper - lower + 1) + lower
  );
};

// Реализация основана на статье https://bobbyhadz.com/blog/javascript-get-random-float-in-range

const getRandomFloat = (min, max, decimals) => {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  if (lower < 0 || upper < 0) {
    return NaN;
  }

  const topLimit = DIVISION_BASE ** decimals;
  const rangeLength = upper - lower + topLimit;

  return parseFloat(
    (Math.random() * (Math.floor(rangeLength * MULTIPLICATION_BASE ** decimals) / (10 ** decimals)) + lower).toFixed(decimals)
  );
};

export {getRandomInt, getRandomFloat};
