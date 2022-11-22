import {clearMarkers} from './map.js';

const SIMILAR_ADS_NUMBER = 10;

const DEFAULT_OPTION = 'any';
const isDefaultOption = (value) => value === DEFAULT_OPTION;

const filterForm = document.querySelector('.map__filters');
const housingFieldInput = filterForm.querySelector('#housing-type');
const priceInput = filterForm.querySelector('#housing-price');
const roomNumberInput = filterForm.querySelector('#housing-rooms');
const guestNumberInput = filterForm.querySelector('#housing-guests');

const filterByHousingType = (ad) => isDefaultOption(housingFieldInput.value) || housingFieldInput.value === ad.offer.type;

const checkPriceInRange = (value) => {
  if (priceInput.value === 'middle') {
    return +value >= 10000 && +value <= 50000;
  } else if (priceInput.value === 'low') {
    return +value < 10000;
  } else if (priceInput.value === 'high') {
    return +value > 50000;
  }
};

const filterByPrice = (ad) => isDefaultOption(priceInput.value) || checkPriceInRange(ad.offer.price);

const filterByRoomNumber = (ad) => isDefaultOption(roomNumberInput.value) || +roomNumberInput.value === +ad.offer.rooms;

const filterByGuestNumber = (ad) => isDefaultOption(guestNumberInput.value) || +guestNumberInput.value === +ad.offer.guests;

const filterByFeature = (ad) => {
  const checkedBoxes = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));
  const selectedFeatures = checkedBoxes.map((feature) => feature.value);

  return ad.offer.features && selectedFeatures.every((feature) => ad.offer.features.includes(feature));
};

const applyFilters = (ads) => {
  clearMarkers();

  const suitableOptions = [];
  let i = 0;

  while (suitableOptions.length < SIMILAR_ADS_NUMBER && i < ads.length) {
    if (filterByHousingType(ads[i]) && filterByPrice(ads[i]) && filterByRoomNumber(ads[i]) && filterByGuestNumber(ads[i]) && filterByFeature(ads[i])) {
      suitableOptions.push(ads[i]);
    }
    i++;
  }
  return suitableOptions;
};

export {applyFilters};
