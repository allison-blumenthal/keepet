import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function TaskCard({ taskObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={`/assets/images/taskAvatars/${taskObj.taskAvatar}`} alt="Task Avatar" style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{taskObj.title}</Card.Title>
          <h3 className="card-text bold">{taskObj.due}</h3>
          <h4>{taskObj.lastDone}</h4>
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
  }).isRequired,
};
