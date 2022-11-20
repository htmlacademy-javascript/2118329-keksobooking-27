const notifyFailureToLoad = () => {
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

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      notifyFailureToLoad(err);
    });
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
  if (evt.key === 'Escape') {
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

const sendData = (body) => {
  fetch('https://27.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        notifyPostingSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => {
      notifyFailureToPost(err);
    });
};

export {getData, sendData};
