import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getMemberByUID } from '../../api/memberData';

export default function TaskCard({ taskObj }) {
  const [taskMember, setTaskMember] = useState({});

  const getTaskMember = () => {
    getMemberByUID(taskObj.memberId).then((memberObj) => {
      setTaskMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getTaskMember();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskObj]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={`/assets/images/taskAvatars/${taskObj.taskAvatar}`} alt="Task Avatar" style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{taskObj.title}</Card.Title>
          <h5 className="card-text bold">Due: {taskObj.due}</h5>
          <h6>Last done: {taskObj.lastDone}</h6>
          <h5>Assigned to: {taskMember.memberName}</h5>
          <Link href={`/task/${taskObj.firebaseKey}`} passHref>
            <Button variant="primary" className="view-btn">View Task</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    due: PropTypes.string,
    lastDone: PropTypes.string,
    taskAvatar: PropTypes.string,
    memberId: PropTypes.string,
  }).isRequired,
};
