/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteTask, getSingleTask } from '../../api/taskData';

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTask(firebaseKey).then(setTaskDetails);
  }, [firebaseKey]);

  const deleteThisTask = () => {
    if (window.confirm(`Delete ${taskDetails.title}?`)) {
      deleteTask(taskDetails.firebaseKey)
        .then(() => router.push('/tasks'));
    }
  };

  return (
    <>
      <Link href={`/task/edit/${firebaseKey}`} passHref>
        <Button variant="info" className="edit-btn">EDIT</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisTask} className="delete-btn">DELETE
      </Button>
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
    </>
  );
}
