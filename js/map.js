import {activateForm, deactivateForm} from './form.js';
import {createAds} from './dom-ads.js';
import {getRandomAds} from './mock-offers.js';

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.6480,
    lng: 139.7845
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.6480,
    lng: 139.7845
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

marker.addTo(map);

const addressField = document.querySelector('#address');
addressField.value = '35.6480, 139.7845';

marker.on('moveend', (evt) => {
  const location = evt.target.getLatLng();
  addressField.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
});

const smallPin = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const points = getRandomAds();
const popups = createAds(points);

for (let i = 0; i < points.length; i++) {
  const similarMarker = L.marker(
    {
      lat: points[i].location.lat,
      lng: points[i].location.lng
    },
    {
      smallPin,
    },
  );

  similarMarker
    .addTo(map)
    .bindPopup(popups[i]);
}
