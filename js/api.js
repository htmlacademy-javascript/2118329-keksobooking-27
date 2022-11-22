const ServerAddress = {
  GET_ADS: 'https://27.javascript.pages.academy/keksobooking/data',
  POST_AD: 'https://27.javascript.pages.academy/keksobookin'
};

const HttpMethod = {
  POST: 'POST'
};

const getData = (onSuccess, onFail) => {
  fetch(ServerAddress.GET_ADS)
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
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(ServerAddress.POST_AD, {
    method: HttpMethod.POST,
    body,
  })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
