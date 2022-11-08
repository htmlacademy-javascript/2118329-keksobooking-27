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

const roomNumberSelector = adForm.querySelector('#room_number');
const guestCapacitySelector = adForm.querySelector('#capacity');
const roomsToPeopleNumber = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

const typeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const housingTypeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');

priceField.min = typeToMinPrice[housingTypeField.value];

const updateMinPrice = () => {
  priceField.min = typeToMinPrice[housingTypeField.value];
  priceField.placeholder = typeToMinPrice[housingTypeField.value];
};

housingTypeField.addEventListener('change', updateMinPrice);

const validatePrice = () => priceField.value.length && +priceField.value >= +priceField.min;

const isEnoughRooms = () => roomsToPeopleNumber[roomNumberSelector.value].includes(guestCapacitySelector.value);

const getPriceWarning = () => `Цена на данный тип объекта не может быть ниже ${priceField.min}`;

pristine.addValidator(guestCapacitySelector, isEnoughRooms, 'Не соответствует количеству комнат');

pristine.addValidator(priceField, validatePrice, getPriceWarning);

const entryTimeField = adForm.querySelector('#timein');
const exitTimeField = adForm.querySelector('#timeout');

const synchronizeTimes = () => {
  if (entryTimeField.value < exitTimeField.value) {
    entryTimeField.value = exitTimeField.value;
  }
  if (exitTimeField.value > entryTimeField.value) {
    exitTimeField.value = entryTimeField.value;
  }
  console.log(entryTimeField.value);
  console.log(exitTimeField.value);
};

entryTimeField.addEventListener('change', synchronizeTimes);

exitTimeField.addEventListener('change', synchronizeTimes);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {deactivateForm, activateForm};
