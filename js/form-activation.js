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
  formFields.forEach((field) => field.removeAttribute('disabled'));
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  filterOptions.forEach((option) => option.removeAttribute('disabled'));
};

export {deactivateForm, activateForm, activateFilters};
