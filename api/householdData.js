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

// CREATE HOUSEHOLD
const createHousehold = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/households.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE HOUSEHOLD
const updateHousehold = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/households/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getHouseholds,
  getSingleHousehold,
  createHousehold,
  updateHousehold,
};
