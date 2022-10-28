import {getRandomInt, getRandomFloat} from './utils.js';

const ADS_NUMBER = 10;

const MAX_PRICE = 50000;

const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const MAX_ROOMS = 7;

const MAX_GUESTS = 20;

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000
};

const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000
};

const LOCATION_PRECISION = 5;

const createAuthor = () => ({
  avatar: ''
});

const createOffer = () => ({
  title: 'Жилье посуточно',
  price: getRandomInt(1, MAX_PRICE),
  type: HOUSING_TYPES[getRandomInt(0, HOUSING_TYPES.length - 1)],
  rooms: getRandomInt(1, MAX_ROOMS),
  guests: getRandomInt(1, MAX_GUESTS),
  checkin: CHECK_TIMES[getRandomInt(0, CHECK_TIMES.length - 1)],
  checkout: CHECK_TIMES[getRandomInt(0, CHECK_TIMES.length - 1)],
  features: FEATURES.slice(0, getRandomInt(1, FEATURES.length)),
  description: 'Отличное жилье в шаговой доступности от центра',
  photos: PHOTOS.slice(0, getRandomInt(1, PHOTOS.length))
});

const createLocation = () => ({
  lat: getRandomFloat(Latitude.MIN, Latitude.MAX, LOCATION_PRECISION),
  lng: getRandomFloat(Longitude.MIN, Longitude.MAX, LOCATION_PRECISION)
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getRandomAds = () => {
  const randomAds = Array.from({length: ADS_NUMBER}, createAd);
  for (let i = 0; i <= ADS_NUMBER - 1; i++) {
    randomAds[i].author.avatar = `img/avatars/user${(String(i + 1)).padStart(2, '0')}.png`;
    randomAds[i].offer.address = `${randomAds[i].location.lat}, ${randomAds[i].location.lng}`;
  }
  return randomAds;
};

export {FEATURES, getRandomAds};

