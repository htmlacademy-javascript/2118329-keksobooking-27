import './form.js';
import './map.js';
import {addMarker} from './map.js';
import {getData} from './api.js';
import {activateFilters} from './form-activation.js';
import {applyFilters} from './filters.js';
import {debounce} from './utils.js';

const SIMILAR_ADS_NUMBER = 10;

const showFailureToLoadMessage = () => {
  const errorMessage = document.createElement('div');
  const pageContainer = document.querySelector('main');

  errorMessage.style.position = 'fixed';
  errorMessage.style.top = '0';
  errorMessage.style.left = '0';
  errorMessage.style.zIndex = '1';

  errorMessage.style.height = '5%';
  errorMessage.style.width = '100vw';

  errorMessage.style.backgroundColor = 'red';

  errorMessage.style.textAlign = 'center';
  errorMessage.style.fontSize = '18px';
  errorMessage.style.fontWeight = '700';

  errorMessage.textContent = 'Не удалось загрузить похожие объявления';

  pageContainer.appendChild(errorMessage);
};

const filterForm = document.querySelector('.map__filters');

getData((data) => {
  data.slice(0, SIMILAR_ADS_NUMBER).forEach(addMarker);

  activateFilters();

  filterForm.addEventListener('change', debounce(() => {
    applyFilters(data).forEach(addMarker);
  }));
}, showFailureToLoadMessage);

