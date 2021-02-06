/**
 * fetch.js - Fetch lib file
 */

import config from "../config/config.json";

/**
 * @method fetchFromApi : Controle des requêtes vers l'api * Requests to the API control
 * @param verb : indique le verbe * indicates verb
 * @param path  : indique le chemin de la requête * indicates path of the request
 * @param data  : indique les données à transmettre * indicates data to be transmitted
 * @param auth  : indique si identification * indicates whether identification
 */
const fetchFromApi = {

  fetchData(verb, path, data, auth = false){
  const urlApp=process.env.NODE_ENV === 'production'? config.urlProd : config.urlLocal;
  const headers = new Headers({
    "Content-Type": "application/json",
    accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    authorization:localStorage.getItem("tokenMaCaveAVin"),
  });
  const options = {
    headers: headers,
    method: verb,
    credentials: "include",
    mode: "cors",
  };
  if (auth && !data._Id) {
    data._Id = localStorage.getItem("_IdMaCaveAVin"); 
  };

  if (verb !== "GET") {
    options.body = JSON.stringify(data);
  };
  return fetch(urlApp + path, options)
  .then((response) => {
    if (
      response.status === 200 ||
      response.status === 301 ||
      response.status === 302
    ) {
      return response.json();
    } else if (response.status === 401) {
      return new Promise((resolve, reject) => {
        reject({ error: true, logout: true, message:response.status });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject({ error: true , message:response.status});
      });
    }
  });
  },
  fetchDataForm(verb,path,formData,auth=true){
      const urlApp=process.env.NODE_ENV === 'production'? config.urlProd : config.urlLocal;
      const options = {
      headers: {authorization:localStorage.getItem("tokenMaCaveAVin")},
      method: verb,
      mode: "cors",
      body: formData, //JSON.stringify(body),
      };
      let params="?id=" +localStorage.getItem("_IdMaCaveAVin")
//Envoie de la requete inscription
    return fetch(urlApp + path + params, options)
    .then((response) => {
      if (
        response.status === 200 ||
        response.status === 301 ||
        response.status === 302
      ) {
        return response.json();
      } else if (response.status === 401) {
        return new Promise((resolve, reject) => {
          reject({ error: true, logout: true, message:response.status });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject({ error: true , message:response.status});
        });
      }
    });
  }
};
export default fetchFromApi;
