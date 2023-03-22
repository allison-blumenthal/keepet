/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { deletePetAndTasks, getPetAndTasks } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import { getMemberByUID } from '../../api/memberData';
import TaskCard from '../../components/cards/TaskCard';
import trash from '../../src/assets/images/delete-icon.png';

export default function ViewPet() {
  const [member, setMember] = useState({});
  const [petDetails, setPetDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const getPetDetails = () => {
    getPetAndTasks(firebaseKey).then(setPetDetails);
  };

  useEffect(() => {
    getMemberInfo();
    getPetDetails();
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
      <div
        className="basic-page-container text-center"
        style={{
          height: '150vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {(petDetails.memberId === member.uid) || (member.isAdmin === true) ? (
          <>
            <div className="btn-container btn-margin">
              <Link href={`/pet/edit/${firebaseKey}`} passHref>
                <button type="button" className="edit-btn pc-font-xsm">EDIT
                </button>
              </Link>
              <button type="button" onClick={deleteThisPet} className="delete-btn">
                <Image src={trash} alt="delete pet icon" />
              </button>
            </div>
          </>
        ) : ''}
        <h1 className="purple pc-font-md">{petDetails.petName}</h1>
        <h3 className="muller-bold-sm">{petDetails.species}</h3>
        <div>
          <img src={`/assets/images/petAvatars/${petDetails.petAvatar}`} alt={petDetails.petName} style={{ width: '300px' }} />
        </div>
        <br />
        <h5 className="muller-reg-sm">Age: {petDetails.petAge}</h5>
        <h5 className="muller-reg-sm">Color: {petDetails.color}</h5>
        <br />
        <h4 className="muller-reg-sm">Info: <br />{petDetails.info}</h4>
        <br />
        <div>
          <h1 className="muller-med-sm">Tasks for {petDetails.petName}:</h1>
        </div>
        <div className="d-flex flex-wrap">
          {petDetails.tasks?.map((task) => (
            <TaskCard key={task.firebaseKey} taskObj={task} onUpdate={getPetDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
