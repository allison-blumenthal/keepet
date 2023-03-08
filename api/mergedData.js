import { createHousehold, updateHousehold } from './householdData';
import { getMemberByUID, updateMember } from './memberData';

// getHouseholdMembers = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleHousehold(firebaseKey).then(householdObj) => {

//   }
// })

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

export default createHouseholdAndUpdateMember;
