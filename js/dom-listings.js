import {getRandomListings} from './mock-offers.js';

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
  const featuresList = element.querySelectorAll('.popup__feature');

  featuresList.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!modifiers.includes(modifier)) {
      feature.remove();
    }
  });
};

const insertListing = () => {
  const listings = getRandomListings();
  const domListings = [];
  for (const listing of listings) {
    const newCard = createCard();
    newCard.querySelector('.popup__title').textContent = listing.offer.title;
    newCard.querySelector('.popup__text--address').textContent = listing.offer.address;
    newCard.querySelector('.popup__text--price').innerHTML = `${listing.offer.price} <span>₽/ночь</span>`;
    newCard.querySelector('.popup__type').textContent = HousingOptions[listing.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = `${listing.offer.rooms} комнаты для ${listing.offer.guests} гостей`;
    newCard.querySelector('.popup__text--time').textContent = `Заезд после ${listing.offer.checkin}, выезд до ${listing.offer.checkout}`;
    newCard.querySelector('.popup__description').textContent = listing.offer.description;
    clearFeatures(listing.offer.features, newCard.querySelector('.popup__features'));

    newCard.querySelector('.popup__avatar').src = listing.author.avatar;


    const photoLibrary = newCard.querySelector('.popup__photos');
    listing.offer.photos.forEach((photo) => {
      const photoSample = newCard.querySelector('.popup__photo').cloneNode();
      photoSample.src = photo;
      photoLibrary.appendChild(photoSample);
    });
    photoLibrary.querySelector('.popup__photo:first-child').remove();

    domListings.push(newCard);
  }
  return domListings;
};

export {insertListing};
