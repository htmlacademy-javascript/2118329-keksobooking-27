import {sendData} from './api.js';
import {setInitialLocation} from './map.js';
import {isEscapeKey} from './utils.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

const roomNumberField = adForm.querySelector('#room_number');
const guestCapacityField = adForm.querySelector('#capacity');
const roomsToCapacityMap = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

const typeToMinPriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const housingTypeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');

priceField.min = typeToMinPriceMap[housingTypeField.value];

const priceSlider = adForm.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  range: {
    min: +priceField.min,
    max: +priceField.max
  },
  start: priceField.min,
  step: 100,
  connect: 'lower',
});

const updateSlider = () => {
  priceSlider.noUiSlider.updateOptions({range: {
    min: +priceField.min,
    max: +priceField.max
  },
  start: priceField.min,});
};

priceSlider.noUiSlider.on('update', () => {
  priceField.value = parseInt(priceSlider.noUiSlider.get(), 10);
});

const onMinPriceUpdate = () => {
  priceField.min = typeToMinPriceMap[housingTypeField.value];
  priceField.placeholder = typeToMinPriceMap[housingTypeField.value];
  updateSlider();
};

housingTypeField.addEventListener('change', onMinPriceUpdate);

const validatePrice = () => priceField.value.length && +priceField.value >= +priceField.min;

const isEnoughRooms = () => roomsToCapacityMap[roomNumberField.value].includes(guestCapacityField.value);

const getPriceWarning = (input) => `Цена на данный тип объекта не может быть ниже ${input.min}`;

pristine.addValidator(guestCapacityField, isEnoughRooms, 'Не соответствует количеству комнат');

pristine.addValidator(priceField, validatePrice, getPriceWarning(priceField));

const entryTimeField = adForm.querySelector('#timein');
const exitTimeField = adForm.querySelector('#timeout');

entryTimeField.addEventListener('change', () => {
  exitTimeField.value = entryTimeField.value;
});

exitTimeField.addEventListener('change', () => {
  entryTimeField.value = exitTimeField.value;
});

const submitButton = adForm.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const bodyContainer = document.querySelector('body');
const failureToPostMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const postingSuccessMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const repeatButton = failureToPostMessage.querySelector('.error__button');

const closeModal = () => {
  if (bodyContainer.contains(failureToPostMessage)) {
    bodyContainer.removeChild(failureToPostMessage);
  } else if (bodyContainer.contains(postingSuccessMessage)) {
    bodyContainer.removeChild(postingSuccessMessage);
  }

  document.removeEventListener('click', closeModal);
  repeatButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const notifyFailureToPost = () => {
  bodyContainer.appendChild(failureToPostMessage);

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeydown);
  repeatButton.addEventListener('click', closeModal);
};

const notifyPostingSuccess = () => {
  bodyContainer.appendChild(postingSuccessMessage);

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeydown);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    blockSubmitButton();
    sendData(notifyPostingSuccess, notifyFailureToPost, formData);
    adForm.reset();
    setInitialLocation();
    unblockSubmitButton();
  }
});

const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  setInitialLocation();
});
