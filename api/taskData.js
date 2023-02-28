import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL TASKS
const getAllTasks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks.json`, {
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

// GET SINGLE TASK
const getSingleTask = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE TASK
const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks.json`, {
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

// UPDATE TASK
const updateTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks/${payload.firebaseKey}.json`, {
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

// DELETE TASK
const deleteTask = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET PET TASKS
const getTasksByPetId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasks.json?orderBy="pet_id"&equalTo="${firebaseKey}"`, {
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

export {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPetId,
};
