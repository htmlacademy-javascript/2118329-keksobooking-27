import {clearComparableMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingFieldInput = filterForm.querySelector('#housing-type');
const priceInput = filterForm.querySelector('#housing-price');
const roomNumberInput = filterForm.querySelector('#housing-rooms');
const guestNumberInput = filterForm.querySelector('#housing-guests');

const filterByHousingType = (ad) => housingFieldInput.value === 'any' || housingFieldInput.value === ad.offer.type;

const checkPriceInRange = (value) => {
  if (priceInput.value === 'middle') {
    return +value >= 10000 && +value <= 50000;
  } else if (priceInput.value === 'low') {
    return +value < 10000;
  } else if (priceInput.value === 'high') {
    return +value > 50000;
  }
};

const filterByPrice = (ad) => priceInput.value === 'any' || checkPriceInRange(ad.offer.price);

const filterByRoomNumber = (ad) => roomNumberInput.value === 'any' || +roomNumberInput.value === +ad.offer.rooms;

const filterByGuestNumber = (ad) => guestNumberInput.value === 'any' || +guestNumberInput.value === +ad.offer.guests;

const filterByFeature = (ad) => {
  const checkedBoxes = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));
  const selectedFeatures = checkedBoxes.map((feature) => feature.value);

  return selectedFeatures.every((feature) => ad.offer.features && ad.offer.features.some((array) => array.includes(feature)));
};

const applyFilters = (ads) => {
  clearComparableMarkers();

  const conformingOptions = [];

  for (let i = 0; i < ads.length; i++) {
    if (conformingOptions.length < 10) {
      if (filterByHousingType(ads[i]) && filterByPrice(ads[i]) && filterByRoomNumber(ads[i]) && filterByGuestNumber(ads[i]) && filterByFeature(ads[i])) {
        conformingOptions.push(ads[i]);
      }
    } else {
      break;
    }
  }
  return conformingOptions;
};

export {applyFilters};
