const DISABLED_ATTRIBUTE = 'disabled';

const mapFilters = document.querySelector('.map__filters');
const filterOptions = Array.from(mapFilters.children);
const adForm = document.querySelector('.ad-form');
const formFields = adForm.querySelectorAll('fieldset');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  formFields.forEach((field) => field.setAttribute(DISABLED_ATTRIBUTE, ''));
  filterOptions.forEach((option) => option.setAttribute(DISABLED_ATTRIBUTE, ''));
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formFields.forEach((field) => field.removeAttribute(DISABLED_ATTRIBUTE));
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  filterOptions.forEach((option) => option.removeAttribute(DISABLED_ATTRIBUTE));
};

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

export {deactivateForm, activateForm, activateFilters, showFailureToLoadMessage};
