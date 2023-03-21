import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { getMemberByUID } from '../../api/memberData';
import view from '../../src/assets/images/arrow-icon.png';

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
      <Card className="skinny-card">
        <Card.Img className="card-avatar" src={`/assets/images/taskAvatars/${taskObj.taskAvatar}`} alt="Task Avatar" />
        <Card.Body>
          <Card.Title className="muller-bold-sm center">{taskObj.title}</Card.Title>
          <h3 className="muller-med-sm center">{taskMember.memberName}</h3>
        </Card.Body>
        <Link href={`/task/${taskObj.firebaseKey}`} passHref>
          <Button variant="link" className="arrow-btn">
            <Image src={view} alt="view task icon" />
          </Button>
        </Link>

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
