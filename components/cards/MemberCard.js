import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import view from '../../src/assets/images/arrow-icon.png';

export default function MemberCard({ memberObj }) {
  return (
    <>
      <Card className="skinny-card">
        <Card.Img className="card-avatar" src={`/assets/images/memberAvatars/${memberObj.memberAvatar}`} alt="Member's Avatar" />
        <Card.Body>
          <Card.Title className="muller-bold-sm center">{memberObj.memberName}</Card.Title>
          <h3 className="muller-med-sm center">{memberObj.role}</h3>
        </Card.Body>
        <Link href={`/member/${memberObj.firebaseKey}`} passHref>
          <Button className="arrow-btn">
            <Image src={view} alt="view member icon" />
          </Button>
        </Link>
      </Card>
    </>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    memberName: PropTypes.string,
    memberAvatar: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};
