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

const roomNumber = adForm.querySelector('#room_number');
const guestCapacity = adForm.querySelector('#capacity');
const capacityOptions = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

const isEnoughRooms = () => capacityOptions[roomNumber.value].includes(guestCapacity.value);

pristine.addValidator(guestCapacity, isEnoughRooms, 'Не соответствует количеству комнат');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {deactivateForm, activateForm};
