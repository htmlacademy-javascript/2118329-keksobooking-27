import {getRandomAds} from './mock-offers.js';
import {createAds} from './dom-ads.js';
import {activateForm, deactivateForm} from './form.js';

document.querySelector('.map__canvas').appendChild(createAds(getRandomAds())[0]);

deactivateForm();
activateForm();
