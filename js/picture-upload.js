const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const apartmentPhotoInput = document.querySelector('#images');
const apartmentPhotoPreview = document.querySelector('.ad-form__photo');

apartmentPhotoInput.addEventListener('change', () => {
  const file = apartmentPhotoInput.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  const pictureElement = document.createElement('img');
  pictureElement.style.maxWidth = '100%';
  pictureElement.style.height = 'auto';

  if (matches) {
    pictureElement.src = URL.createObjectURL(file);
  }
  apartmentPhotoPreview.appendChild(pictureElement);
});

const clearImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  apartmentPhotoPreview.innerHTML = '';
};

export {clearImages};
