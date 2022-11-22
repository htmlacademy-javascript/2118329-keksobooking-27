const HousingOptions = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const createCard = () => document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

const clearFeatures = (features, element) => {
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  const featureIcons = element.querySelectorAll('.popup__feature');

  featureIcons.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!modifiers.includes(modifier)) {
      feature.remove();
    }
  });
};

const createAd = (ad) => {
  const newCard = createCard();
  newCard.querySelector('.popup__title').textContent = ad.offer.title;
  newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
  newCard.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
  newCard.querySelector('.popup__type').textContent = HousingOptions[ad.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  if (ad.offer.description) {
    newCard.querySelector('.popup__description').textContent = ad.offer.description;
  }
  if (ad.offer.features) {
    clearFeatures(ad.offer.features, newCard.querySelector('.popup__features'));
  }

  newCard.querySelector('.popup__avatar').src = ad.author.avatar;


  if (ad.offer.photos) {
    const photoContainer = newCard.querySelector('.popup__photos');
    ad.offer.photos.forEach((photo) => {
      const photoSample = newCard.querySelector('.popup__photo').cloneNode();
      photoSample.src = photo;
      photoContainer.appendChild(photoSample);
    });
    photoContainer.querySelector('.popup__photo:first-child').remove();
  }

  return newCard;
};

export {createAd};
