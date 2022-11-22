import {addMarker} from './map.js';
import {getData} from './api.js';
import {activateFilters, showFailureToLoadMessage} from './form-activation.js';
import {applyFilters} from './filters.js';
import {debounce} from './utils.js';

const SIMILAR_ADS_NUMBER = 10;

const filterForm = document.querySelector('.map__filters');

getData((data) => {
  data.slice(0, SIMILAR_ADS_NUMBER).forEach(addMarker);

  activateFilters();

  filterForm.addEventListener('change', debounce(() => {
    applyFilters(data).forEach(addMarker);
  }));
}, showFailureToLoadMessage);
