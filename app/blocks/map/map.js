import { inject } from 'aurelia-framework';
import mapsapi from 'google-maps-api';

//  API key
//  AIzaSyAhTmgtMtEDorDsQwyrkrLPjAie8g7IV34
inject(mapsapi('AIzaSyAhTmgtMtEDorDsQwyrkrLPjAie8g7IV34'));
export default () => {
  /* eslint-disable */
  google.maps.event.addDomListener(window, 'load', init);

  function init() {

    let mapOptions = {
      zoom: 11,

      center: new google.maps.LatLng(40.6700, -73.9400),
      styles: [
      {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': [
              {
                  'color': '#ffffff'
              }
          ]
      },
      {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': [
              {
                  'visibility': 'on'
              },
              {
                  'color': '#424b5b'
              },
              {
                  'weight': 2
              },
              {
                  'gamma': '1'
              }
          ]
      },
      {
          'featureType': 'all',
          'elementType': 'labels.icon',
          'stylers': [
              {
                  'visibility': 'off'
              }
          ]
      },
      {
          'featureType': 'administrative',
          'elementType': 'geometry',
          'stylers': [
              {
                  'weight': 0.6
              },
              {
                  'color': '#545b6b'
              },
              {
                  'gamma': '0'
              }
          ]
      },
      {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#545b6b'
              },
              {
                  'gamma': '1'
              },
              {
                  'weight': '10'
              }
          ]
      },
      {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#666c7b'
              }
          ]
      },
      {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#545b6b'
              }
          ]
      },
      {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#424a5b'
              },
              {
                  'lightness': '0'
              }
          ]
      },
      {
          'featureType': 'transit',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#666c7b'
              }
          ]
      },
      {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
              {
                  'color': '#2e3546'
              }
          ]
      }
  ]
    };

    let mapElement = document.getElementById('map');

    let map = new google.maps.Map(mapElement, mapOptions);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(40.6700, -73.9400),
      map: map,
      title: 'Snazzy!'
    });
  }
  // const mainSlider = new Swiper('.main-slider', {
  //   pagination: '.main-slider__swiper-pagination',
  //   paginationClickable: true,
  //   autoplay: 5000,
  //   initialSlide: 1,
  // });
};
