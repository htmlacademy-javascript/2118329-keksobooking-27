const mapFilters = document.querySelector('.map__filters');
const filterOptions = Array.from(mapFilters.children);
const adForm = document.querySelector('.ad-form');
const formFields = adForm.querySelectorAll('fieldset');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  formFields.forEach((field) => field.setAttribute('disabled', ''));
  filterOptions.forEach((option) => option.setAttribute('disabled', ''));
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  formFields.forEach((field) => field.removeAttribute('disabled'));
  filterOptions.forEach((option) => option.removeAttribute('disabled'));
};

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {deactivateForm, activateForm};
