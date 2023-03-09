import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function MemberCard({ memberObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={`/assets/images/memberAvatars/${memberObj.memberAvatar}`} alt="Member's Avatar" style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <h3 className="card-text bold">{memberObj.role}</h3>
          <Link href={`/member/${memberObj.firebaseKey}`} passHref>
            <Button variant="primary" className="view-btn">View Member</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdId: PropTypes.string,
    uid: PropTypes.string,
    isAdmin: PropTypes.bool,
    name: PropTypes.string,
    age: PropTypes.string,
    memberAvatar: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
