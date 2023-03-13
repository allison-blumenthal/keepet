/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Head from 'next/head';
import { deleteTask, getSingleTask } from '../../api/taskData';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import { getCommentsByTaskId } from '../../api/commentData';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/cards/CommentCard';

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [member, setMember] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const displayComments = () => {
    getCommentsByTaskId(firebaseKey).then(setComments);
  };

  const deleteThisTask = () => {
    if (window.confirm(`Delete ${taskDetails.title}?`)) {
      deleteTask(taskDetails.firebaseKey)
        .then(() => router.push('/tasks'));
    }
  };

  useEffect(() => {
    getMemberInfo();
    getSingleTask(firebaseKey).then(setTaskDetails);
    displayComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseKey]);

  return (
    <>
      <Head>
        <title>{taskDetails?.title}</title>
      </Head>
      {member.isAdmin === true ? (
        <>
          <Link href={`/task/edit/${firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisTask} className="delete-btn">DELETE
          </Button>
        </>
      )
        : '' }
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={`/assets/images/taskAvatars/${taskDetails.taskAvatar}`} alt={taskDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h2>{taskDetails.title}</h2>
          <h3>{taskDetails.location}</h3>
          <h3>{taskDetails.timeOfDay}</h3>
          <h3>{taskDetails.due}</h3>
          <h3>{taskDetails.lastDone}</h3>
          <p>{taskDetails.taskDescription}</p>
        </div>
      </div>
      <div>
        <div className="comment-cards-container">{comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={displayComments} />
        ))}
        </div>
      </div>
      <div className="comment-form">
        <CommentForm taskFirebaseKey={firebaseKey} onUpdate={displayComments} />
      </div>
    </>
  );
}
