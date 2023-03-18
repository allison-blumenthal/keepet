/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Head from 'next/head';
import { deletePetAndTasks, getSinglePet } from '../../api/petData';
import { useAuth } from '../../utils/context/authContext';
import { getMemberByUID } from '../../api/memberData';

export default function ViewPet() {
  const [member, setMember] = useState({});
  const [petDetails, setPetDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    getSinglePet(firebaseKey).then(setPetDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseKey]);

  const deleteThisPet = () => {
    if (window.confirm(`Delete ${petDetails.petName}?`)) {
      deletePetAndTasks(petDetails.firebaseKey)
        .then(() => router.push('/pets'));
    }
  };

  return (
    <>
      <Head>
        <title>{petDetails?.title}</title>
      </Head>
      {(petDetails.memberId === member.uid) || (member.isAdmin === true) ? (
        <>
          <Link href={`/pet/edit/${firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPet} className="delete-btn">DELETE
          </Button>
        </>
      ) : ''}
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
