import { createHousehold, updateHousehold } from './householdData';
import { getMemberByUID, updateMember } from './memberData';
import { getTasksByPetId, deleteTask } from './taskData';
import { deletePet } from './petData';
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

export { createHouseholdAndUpdateMember, deletePetAndTasks, deleteTaskAndComments };
