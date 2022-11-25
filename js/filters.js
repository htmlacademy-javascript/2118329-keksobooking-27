import {clearMarkers} from './map.js';
import {SIMILAR_ADS_NUMBER} from './similar-ads.js';

const DEFAULT_OPTION = 'any';
const isDefaultOption = (value) => value === DEFAULT_OPTION;

const filterForm = document.querySelector('.map__filters');
const housingTypeField = filterForm.querySelector('#housing-type');
const priceField = filterForm.querySelector('#housing-price');
const roomNumberField = filterForm.querySelector('#housing-rooms');
const guestNumberField = filterForm.querySelector('#housing-guests');

const filterByHousingType = (ad) => isDefaultOption(housingTypeField.value) || housingTypeField.value === ad.offer.type;

const checkPriceInRange = (value) => {
  if (priceField.value === 'middle') {
    return +value >= 10000 && +value <= 50000;
  } else if (priceField.value === 'low') {
    return +value < 10000;
  } else if (priceField.value === 'high') {
    return +value > 50000;
  }
};

const filterByPrice = (ad) => isDefaultOption(priceField.value) || checkPriceInRange(ad.offer.price);

const filterByRoomNumber = (ad) => isDefaultOption(roomNumberField.value) || +roomNumberField.value === +ad.offer.rooms;

const filterByGuestNumber = (ad) => isDefaultOption(guestNumberField.value) || +guestNumberField.value === +ad.offer.guests;

const filterByFeature = (ad) => {
  const checkedBoxes = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));
  const selectedFeatures = checkedBoxes.map((feature) => feature.value);

  return ad.offer.features && selectedFeatures.every((feature) => ad.offer.features.includes(feature));
};

const isSuitable = (ad) => filterByHousingType(ad)
  && filterByPrice(ad)
  && filterByRoomNumber(ad)
  && filterByGuestNumber(ad)
  && filterByFeature(ad);

const applyFilters = (ads) => {
  clearMarkers();

  const suitableOptions = [];
  let i = 0;

  while (suitableOptions.length < SIMILAR_ADS_NUMBER && i < ads.length) {
    if (isSuitable(ads[i])) {
      suitableOptions.push(ads[i]);
    }
    i++;
  }
  return suitableOptions;
};

export {applyFilters};
