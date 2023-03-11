/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deletePet, getSinglePet } from '../../api/petData';

export default function ViewPet() {
  const [petDetails, setPetDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePet(firebaseKey).then(setPetDetails);
  }, [firebaseKey]);

  const deleteThisPet = () => {
    if (window.confirm(`Delete ${petDetails.petName}?`)) {
      deletePet(petDetails.firebaseKey)
        .then(() => router.push('/pets'));
    }
  };

  return (
    <>
      <Link href={`/pet/edit/${firebaseKey}`} passHref>
        <Button variant="info" className="edit-btn">Edit Pet</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisPet} className="delete-btn">DELETE
      </Button>
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
