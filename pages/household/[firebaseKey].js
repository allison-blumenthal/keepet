/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleHousehold } from '../../api/householdData';

function ViewHousehold() {
  const [householdDetails, setHouseholdDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getHouseholdDetails = () => {
    getSingleHousehold(firebaseKey).then(setHouseholdDetails);
  };

  useEffect(() => {
    getHouseholdDetails();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{householdDetails?.householdName}</title>
      </Head>
      <div className="text-black ms-5 details">
        <h2>
          {householdDetails?.householdName}
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={householdDetails?.imageUrl} alt={householdDetails?.householdName} style={{ width: '300px' }} />
      </div>
      {/* <div
        className="d-flex flex-wrap"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {householdDetails.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getMemberDetails} />
        ))}
      </div> */}
    </>
  );
}

export default ViewHousehold;
