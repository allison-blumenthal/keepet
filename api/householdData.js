import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET HOUSEHOLDS
const getHouseholds = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/households.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE HOUSEHOLD
const getSingleHousehold = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/households/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getHouseholds,
  getSingleHousehold,
};
