import { createHousehold, updateHousehold } from './householdData';
import { getMemberByUID, updateMember } from './memberData';

// Create household object, update member's householdId
const createHouseholdAndUpdateMember = (payload) => new Promise((resolve, reject) => {
  createHousehold(payload).then(({ name }) => {
    const patchPayload = { firebaseKey: name };
    updateHousehold(patchPayload).then(() => {
      getMemberByUID(payload.uid).then((memberObj) => {
        const memberPayload = { householdId: name, firebaseKey: memberObj[0].firebaseKey };
        updateMember(memberPayload).then(resolve);
      });
    });
  })
    .catch(reject);
});

// Update member's householdId
const updateMemberHouseholdId = (payload, uid) => new Promise((resolve, reject) => {
  getMemberByUID(uid).then(() => {
    const patchPayload = { householdId: payload };
    updateMember(patchPayload).then(resolve);
  })
    .catch(reject);
});

export {
  createHouseholdAndUpdateMember,
  updateMemberHouseholdId,
};