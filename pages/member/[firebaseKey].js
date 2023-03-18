/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleMember, getMemberByUID, getMemberTasks } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import TaskCard from '../../components/cards/TaskCard';

export default function ViewMember() {
  const [member, setMember] = useState({});
  const [memberPageDetails, setMemberPageDetails] = useState({});
  const [memberPageTasks, setMemberPageTasks] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const getMemberPageTasks = () => {
    getSingleMember(firebaseKey).then((memberPageObj) => {
      setMemberPageDetails(memberPageObj);
      getMemberTasks(memberPageDetails.uid).then((memberTasksArray) => {
        setMemberPageTasks(memberTasksArray);
      });
    });
  };

  useEffect(() => {
    getMemberPageTasks();
    getMemberInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseKey]);

  return (
    <>
      <Head>
        <title>{memberPageDetails?.title}</title>
      </Head>
      {(memberPageDetails.uid === member.uid) || (member.isAdmin === true) ? (
        <>
          <Link href={`/member/edit/${firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">EDIT</Button>
          </Link>
        </>
      ) : ''}
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={`/assets/images/memberAvatars/${memberPageDetails.memberAvatar}`} alt={memberPageDetails.memberName} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h2>{memberPageDetails.memberName}</h2>
          <h3>{memberPageDetails.role}</h3>
          <h3>{memberPageDetails.memberAge}</h3>
          <p>{memberPageDetails.description}</p>
        </div>
        <div className="d-flex flex-wrap">
          {memberPageTasks.map((task) => (
            <TaskCard key={task.firebaseKey} taskObj={task} onUpdate={getMemberPageTasks} />
          ))}
        </div>
      </div>
    </>
  );
}
