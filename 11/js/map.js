import {activateForm, deactivateForm} from './form-activation.js';
import {createAd} from './dom-ads.js';

const TOKYO_CENTER_LAT = 35.6480;
const TOKYO_CENTER_LNG = 139.7845;
const LOCATION_PRECISION = 5;

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const COMPARABLE_PIN_SIZE = [40, 40];
const COMPARABLE_PIN_ANCHOR = [20, 40];

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const marker = L.marker(
  {
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

marker.addTo(map);

const addressField = document.querySelector('#address');
addressField.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

marker.on('moveend', (evt) => {
  const location = evt.target.getLatLng();
  addressField.value = `${location.lat.toFixed(LOCATION_PRECISION)}, ${location.lng.toFixed(LOCATION_PRECISION)}`;
});

const setInitialLocation = () => {
  marker.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG
  });
  addressField.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;
};

const markerGroup = L.layerGroup().addTo(map);

const comparableAdsPin = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: COMPARABLE_PIN_SIZE,
  iconAnchor: COMPARABLE_PIN_ANCHOR,
});

const addMarker = (ad) => {
  const similarMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng
    },
    {
      comparableAdsPin,
    },
  );

  similarMarker
    .addTo(markerGroup)
    .bindPopup(createAd(ad));
};

const clearComparableMarkers = () => {
  markerGroup.clearLayers();
};

export {addMarker, clearComparableMarkers, setInitialLocation};
