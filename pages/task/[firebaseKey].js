/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { getSingleTask, updateTask } from '../../api/taskData';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import { getCommentsByTaskId } from '../../api/commentData';
import { deleteTaskAndComments } from '../../api/mergedData';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/cards/CommentCard';
import check from '../../src/assets/images/check-icon.jpg';
import trash from '../../src/assets/images/delete-icon.png';
import { getSinglePet } from '../../api/petData';

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [comments, setComments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sortedComments, setSortedComments] = useState([]);
  const [member, setMember] = useState({});
  const [pet, setPet] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const time = new Date().toLocaleString('en-US', options);

  const deleteThisTask = () => {
    if (window.confirm(`Delete ${taskDetails.title}?`)) {
      deleteTaskAndComments(taskDetails.firebaseKey)
        .then(() => router.push('/tasks'));
    }
  };

  const logThisTask = () => {
    if (window.confirm(`Log "${taskDetails.title}" as done?`)) {
      const payload = { lastDone: time, firebaseKey: taskDetails.firebaseKey };
      updateTask(payload)
        .then(() => router.push('/tasks'));
    }
  };

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const displayComments = () => {
    getCommentsByTaskId(firebaseKey).then((commentArr) => {
      setComments(commentArr);
      if (commentArr) {
        const sorted = [...commentArr].sort((a, b) => b.timestamp - a.timestamp);
        setSortedComments(sorted);
      }
    });
  };

  const getPet = () => {
    getSingleTask(firebaseKey).then((taskObj) => {
      getSinglePet(taskObj.petId).then((petObj) => {
        setPet(petObj);
      });
    });
  };

  useEffect(() => {
    getMemberInfo();
    getSingleTask(firebaseKey).then(setTaskDetails);
    displayComments();
    getPet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseKey]);

  return (
    <>
      <Head>
        <title>{taskDetails?.title}</title>
      </Head>
      <div
        className="basic-page-container text-center"
        style={{
          height: '300vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {member.isAdmin === true ? (
          <>
            <div className="task-btn-container">
              <button type="button" onClick={logThisTask} className="log-btn">
                <Image src={check} alt="check icon" />
              </button>
              <Link href={`/task/edit/${firebaseKey}`} passHref>
                <button type="button" className="edit-btn pc-font-xsm">EDIT</button>
              </Link>
              <button type="button" onClick={deleteThisTask} className="delete-btn">
                <Image src={trash} alt="delete icon" />
              </button>
            </div>
          </>
        )
          : (
            <div className="task-btn-container">
              <button type="button" onClick={logThisTask} className="log-btn">
                <Image src={check} alt="check icon" />
              </button>
            </div>
          ) }
        <h1 className="purple pc-font-md">{taskDetails.title}</h1>
        <h3 className="muller-bold-sm">Pet: {pet.petName}</h3>
        <h3 className="muller-bold-sm">Due: {taskDetails.due}</h3>
        <div>
          <img src={`/assets/images/taskAvatars/${taskDetails.taskAvatar}`} alt={taskDetails.title} style={{ width: '300px' }} />
        </div>
        <br />
        <h5 className="muller-reg-sm">Location: {taskDetails.location}</h5>
        <br />
        <h5 className="muller-reg-sm">Time of day: {taskDetails.timeOfDay}</h5>
        <br />
        <p className="muller-reg-sm">Description: {taskDetails.taskDescription}</p>
        <br />
        <h4 className="muller-med-sm">Last completed: <br />{taskDetails.lastDone}</h4>
        <br />
        <div className="comment-form">
          <CommentForm taskFirebaseKey={firebaseKey} onUpdate={displayComments} />
        </div>
        <div>
          <div className="comment-cards-container">
            {sortedComments
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((comment) => (
                <CommentCard key={comment?.firebaseKey} commentObj={comment} onUpdate={displayComments} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
