import { clientCredentials } from '../utils/client';
import { deleteTask } from './taskData';

const endpoint = clientCredentials.databaseURL;

// GET TASK COMMENTS
const getCommentsByTaskId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json?orderBy="task_id"&equalTo="${firebaseKey}"`, {
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

// CREATE COMMENTS
const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json`, {
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

// UPDATE COMMENTS
const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${payload.firebaseKey}.json`, {
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

// DELETE SINGLE COMMENT
const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// DELETE TASK COMMENTS
const deleteTaskComments = (firebaseKey) => new Promise((resolve, reject) => {
  getCommentsByTaskId(firebaseKey).then((taskComments) => {
    const deleteCommentsPromises = taskComments.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentsPromises).then(() => {
      deleteTask(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  getCommentsByTaskId,
  createComment,
  updateComment,
  deleteComment,
  deleteTaskComments,
};
