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
import NavBar from '../../components/NavBar';

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
      <NavBar />
      <div className="basic-page-container text-center">
        <h1 className="purple pc-font-md">{petDetails.petName}</h1>
        <h3 className="muller-bold-sm">Species: {petDetails.species}</h3>
        <h5 className="muller-med-xsm">Age: {petDetails.petAge}</h5>
        <h5 className="muller-med-xsm">Color: {petDetails.color}</h5>
        <h4 className="muller-light-xsm">Info: {petDetails.info}</h4>
        <div>
          <img src={`/assets/images/petAvatars/${petDetails.petAvatar}`} alt={petDetails.petName} style={{ width: '300px' }} />
        </div>
        <br />
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
