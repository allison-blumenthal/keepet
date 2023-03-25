/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import TaskCard from '../../components/cards/TaskCard';
import { getMemberAndTasks } from '../../api/mergedData';
import NavBar from '../../components/NavBar';

export default function ViewMember() {
  const [member, setMember] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const getMemberDetails = () => {
    getMemberAndTasks(firebaseKey).then(setMemberDetails);
  };

  useEffect(() => {
    getMemberInfo();
    getMemberDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseKey]);

  return (
    <>
      <Head>
        <title>{memberDetails?.title}</title>
      </Head>
      <NavBar />
      <div className="basic-page-container text-center">
        <h1 className="purple pc-font-md">{memberDetails.memberName}</h1>
        <h3 className="muller-bold-sm">{memberDetails.role}</h3>
        {memberDetails.isAdmin === true ? (<h2 className="muller-bold-xsm">Head of Household</h2>) : '' }
        <h6 className="muller-light-xsm">{memberDetails.description}</h6>
        <div>
          <img src={`/assets/images/memberAvatars/${memberDetails.memberAvatar}`} alt={memberDetails.memberName} style={{ width: '300px' }} />
        </div>
        <br />
        {(memberDetails.uid === member.uid) || (member.isAdmin === true) ? (
          <>
            <div className="btn-margin">
              <Link href={`/member/edit/${firebaseKey}`} passHref>
                <button type="button" className="edit-btn pc-font-xsm">EDIT
                </button>
              </Link>
            </div>
          </>
        ) : ''}
        <h1 className="muller-med-sm">Tasks assigned:</h1>
        <div className="d-flex flex-wrap">
          {memberDetails.tasks?.map((task) => (
            <TaskCard key={task.firebaseKey} taskObj={task} onUpdate={getMemberDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
