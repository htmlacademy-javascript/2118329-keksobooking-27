import {sendData} from './api.js';
import {setInitialLocation, closePopups} from './map.js';
import {isEscapeKey} from './utils.js';
import {validateForm} from './form-validation.js';
import {clearImages} from './picture-upload.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

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

const removeModal = () => {
  if (bodyContainer.contains(failureToPostMessage)) {
    bodyContainer.removeChild(failureToPostMessage);
  }
  if (bodyContainer.contains(postingSuccessMessage)) {
    bodyContainer.removeChild(postingSuccessMessage);
  }
};

const onOverlayClick = () => {
  removeModal();
  removeListeners();
};

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    removeModal();
    removeListeners();
  }
};

const onButtonClick = () => {
  removeModal();
  removeListeners();
};

function removeListeners () {
  document.removeEventListener('click', onOverlayClick);
  repeatButton.removeEventListener('click', onEscapeKeydown);
  document.removeEventListener('keydown', onButtonClick);
}

const showFailureModal = () => {
  bodyContainer.appendChild(failureToPostMessage);

  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);
  repeatButton.addEventListener('click', onButtonClick);
};

const showSuccessModal = () => {
  bodyContainer.appendChild(postingSuccessMessage);

  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);

  adForm.reset();
  filterForm.reset();
  clearImages();
  closePopups();
  setInitialLocation();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }
  const formData = new FormData(evt.target);

  blockSubmitButton();

  sendData(showSuccessModal, showFailureModal, formData);

  unblockSubmitButton();
});

const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  filterForm.reset();
  closePopups();

  setInitialLocation();
});
