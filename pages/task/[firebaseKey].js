/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Head from 'next/head';
import { getSingleTask, updateTask } from '../../api/taskData';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import { getCommentsByTaskId } from '../../api/commentData';
import { deleteTaskAndComments } from '../../api/mergedData';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/cards/CommentCard';

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [comments, setComments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sortedComments, setSortedComments] = useState([]);
  const [member, setMember] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const time = new Date();

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
          <Button variant="success" onClick={logThisTask} className="log-btn">LOG
          </Button>
          <Link href={`/task/edit/${firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisTask} className="delete-btn">DELETE
          </Button>
        </>
      )
        : (
          <Button variant="success" onClick={logThisTask} className="log-btn">LOG
          </Button>
        ) }
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
        <div className="comment-cards-container">
          {sortedComments
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((comment) => (
              <CommentCard key={comment?.firebaseKey} commentObj={comment} onUpdate={displayComments} />
            ))}
        </div>
      </div>
      <div className="comment-form">
        <CommentForm taskFirebaseKey={firebaseKey} onUpdate={displayComments} />
      </div>
    </>
  );
}
