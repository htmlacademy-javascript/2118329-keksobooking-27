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
    min: 0,
    max: +priceField.max
  },
  start: priceField.min,
  step: 100,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  priceField.value = parseInt(priceSlider.noUiSlider.get(), 10);
});

const onMinPriceUpdate = () => {
  priceField.min = typeToMinPriceMap[housingTypeField.value];
  priceField.placeholder = typeToMinPriceMap[housingTypeField.value];
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

const validateForm = () => pristine.validate();

export {validateForm};
