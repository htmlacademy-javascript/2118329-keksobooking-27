const ServerAddresses = {
  GET_ADDRESS: 'https://27.javascript.pages.academy/keksobooking/data',
  POST_ADDRESS: 'https://27.javascript.pages.academy/keksobooking'
};


const getData = (onSuccess, onFail) => {
  fetch(ServerAddresses.GET_ADDRESS)
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
  fetch(ServerAddresses.POST_ADDRESS, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
