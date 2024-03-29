import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL PETS
const getAllPets = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets.json`, {
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

// GET SINGLE PET
const getSinglePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE PET
const createPet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets.json`, {
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

// UPDATE PET
const updatePet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets/${payload.firebaseKey}.json`, {
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

// DELETE PET
const deletePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET PETS BY HOUSEHOLDID
const getPetsByHouseholdId = (householdId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pets.json?orderBy="householdId"&equalTo="${householdId}"`, {
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
    }).catch(reject);
});

const getPetTasks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks.json?orderBy="petId"&equalTo="${firebaseKey}"`, {
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
    }).catch(reject);
});

export {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet,
  getPetsByHouseholdId,
  getPetTasks,
};
