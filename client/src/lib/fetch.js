/**
 * fetch.js - Fetch lib file
 */

/*Config import*/
import config from "../config/config.json";

/* Fetch from api method*/
const fetchFromApi = (verb, path, data, auth = false) => {
  const urlApp=process.env.NODE_ENV === 'production'? config.urlProd : config.urlLocal;
  const headers = new Headers({
    "Content-Type": "application/json",
    accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  });
  const options = {
    headers: headers,
    method: verb,
    credentials: "include",
    mode: "cors",
  };
  if (auth && !data._Id && localStorage.getItem("_Id")) {
    data._Id = localStorage.getItem("_Id");
    headers.authorization = localStorage.getItem("token");
  }
  if (verb !== "GET") {
    options.body = JSON.stringify(data);
  }

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
        reject({ error: true, logout: true });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject({ error: true });
      });
    }
  });
};
export default fetchFromApi;
