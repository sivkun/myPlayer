import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

if (!window.Promise) {
  window.Promise = Promise;
}
export function getData(){
  return fetch('/data.json')
  .then(function(response) {
    //console.log(response);
    return response.json()
  })
}

