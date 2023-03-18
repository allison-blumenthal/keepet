import { createHousehold, updateHousehold } from './householdData';
import {
  getMemberByUID, updateMember, getSingleMember, getMemberTasks,
} from './memberData';
import { getTasksByPetId, deleteTask } from './taskData';
import { deletePet, getPetTasks, getSinglePet } from './petData';
import { getCommentsByTaskId, deleteComment } from './commentData';

// Create household object, update member's householdId
const createHouseholdAndUpdateMember = (payload) => new Promise((resolve, reject) => {
  createHousehold(payload).then(({ name }) => {
    const patchPayload = { firebaseKey: name };
    updateHousehold(patchPayload).then(() => {
      getMemberByUID(payload.uid).then((memberObj) => {
        const memberPayload = { householdId: name, firebaseKey: memberObj[0].firebaseKey, isAdmin: true };
        updateMember(memberPayload).then(resolve);
      });
    });
  })
    .catch(reject);
});

// DELETE PET AND ASSOCIATED TASKS
const deletePetAndTasks = (firebaseKey) => new Promise((resolve, reject) => {
  getTasksByPetId(firebaseKey).then((petTasks) => {
    const deleteTaskPromises = petTasks.map((task) => deleteTask(task.firebaseKey));

    Promise.all(deleteTaskPromises).then(() => {
      deletePet(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

// DELETE TASK AND ASSOCIATED COMMENTS
const deleteTaskAndComments = (firebaseKey) => new Promise((resolve, reject) => {
  getCommentsByTaskId(firebaseKey).then((taskComments) => {
    const deleteCommentsPromises = taskComments.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentsPromises).then(() => {
      deleteTask(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

// GET MEMBER AND ASSOCIATED TASKS
const getMemberAndTasks = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      getMemberTasks(memberObj.uid)
        .then((memberTasksArray) => {
          resolve({ ...memberObj, tasks: memberTasksArray });
        });
    }).catch((error) => reject(error));
});

// GET PET AND ASSOCIATED TASKS
const getPetAndTasks = (petFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePet(petFirebaseKey), getPetTasks(petFirebaseKey)])
    .then(([petObj, petTasksArray]) => {
      resolve({ ...petObj, tasks: petTasksArray });
    }).catch((error) => reject(error));
});

export {
  createHouseholdAndUpdateMember,
  deletePetAndTasks,
  deleteTaskAndComments,
  getMemberAndTasks,
  getPetAndTasks,
};
