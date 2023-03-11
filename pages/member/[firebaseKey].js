/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../api/memberData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={`/assets/images/memberAvatars/${memberDetails.memberAvatar}`} alt={memberDetails.memberName} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h2>{memberDetails.memberName}</h2>
          <h3>{memberDetails.role}</h3>
          <h3>{memberDetails.memberAge}</h3>
          <p>{memberDetails.description}</p>
        </div>
      </div>
    </>
  );
}
