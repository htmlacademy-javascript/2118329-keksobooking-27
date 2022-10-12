const LISTINGS_NUMBER = 10;

const MAX_PRICE = 50000;

const listingTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const MAX_ROOMS = 7;

const MAX_GUESTS = 20;

const checkTimes = ['12:00', '13:00', '14:00'];

const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photosList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MIN_LAT = 35.65000;

const MAX_LAT = 35.70000;

const MIN_LNG = 139.70000;

const MAX_LNG = 139.80000;

const LOCATION_PRECISION = 5;

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
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  if (lower < 0 || upper < 0) {
    return NaN;
  }

  const topLimit = 0.1 ** decimals;
  const rangeLength = upper - lower + topLimit;

  return parseFloat(
    (Math.random() * (Math.floor(rangeLength * 10 ** decimals) / (10 ** decimals)) + lower).toFixed(decimals)
  );
}

const createAuthor = () => ({
  avatar: ''
});

const createOffer = () => ({
  title: 'Жилье посуточно',
  price: getRandomInt(1, MAX_PRICE),
  type: listingTypes[getRandomInt(0, listingTypes.length - 1)],
  rooms: getRandomInt(1, MAX_ROOMS),
  guests: getRandomInt(1, MAX_GUESTS),
  checkin: checkTimes[getRandomInt(0, checkTimes.length - 1)],
  checkout: checkTimes[getRandomInt(0, checkTimes.length - 1)],
  features: featuresList.slice(0, getRandomInt(1, featuresList.length)),
  description: 'Отличное жилье в шаговой доступности от центра',
  photos: photosList.slice(0, getRandomInt(1, photosList.length))
});

const createLocation = () => ({
  lat: getRandomFloat(MIN_LAT, MAX_LAT, LOCATION_PRECISION),
  lng: getRandomFloat(MIN_LNG, MAX_LNG, LOCATION_PRECISION)
});

const createListing = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getRandomListings = () => {
  const randomListings = Array.from({length: LISTINGS_NUMBER}, createListing);
  for (let i = 0; i <= LISTINGS_NUMBER - 1; i++) {
    randomListings[i].author = `img/avatars/user${(String(i + 1)).padStart(2, '0')}.png`;
    randomListings[i].offer.address = `${randomListings[i].location.lat}, ${randomListings[i].location.lng}`;
  }
  return randomListings;
};

getRandomInt(1, 10);
getRandomFloat(2.1, 2.2, 2);
getRandomListings();
