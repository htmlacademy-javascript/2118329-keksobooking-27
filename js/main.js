import './form.js';
import './map.js';
import {addMarker} from './map.js';
import {getData} from './api.js';

const SIMILAR_ADS_NUMBER = 10;

getData((data) => {
  data.slice(0, SIMILAR_ADS_NUMBER).forEach(addMarker);
});
