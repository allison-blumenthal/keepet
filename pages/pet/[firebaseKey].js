/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePet } from '../../api/petData';

export default function ViewPet() {
  const [petDetails, setPetDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePet(firebaseKey).then(setPetDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={`/assets/images/petAvatars/${petDetails.petAvatar}`} alt={petDetails.petName} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h2>{petDetails.petName}</h2>
          <h3>{petDetails.species}</h3>
          <h3>{petDetails.petAge}</h3>
          <h3>{petDetails.color}</h3>
          <p>{petDetails.info}</p>
        </div>
      </div>
    </>
  );
}
