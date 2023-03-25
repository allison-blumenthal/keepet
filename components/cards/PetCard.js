import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import view from '../../src/assets/images/arrow-icon.png';

export default function PetCard({ petObj }) {
  return (
    <>
      <Card className="skinny-card">
        <Card.Img className="card-avatar" src={`/assets/images/petAvatars/${petObj.petAvatar}`} alt="Pet's Avatar" />
        <Card.Body>
          <Card.Title className="muller-med-xsm center">{petObj.petName}</Card.Title>
          <Card.Title className="muller-bold-xxsm center">Species: {petObj.species}</Card.Title>
          <Card.Title className="muller-reg-xxsm center">Color: {petObj.color}</Card.Title>
          <Card.Title className="muller-reg-xxsm center">Age: {petObj.petAge}</Card.Title>
        </Card.Body>
        <Link href={`/pet/${petObj.firebaseKey}`} passHref>
          <Button variant="link" className="arrow-btn">
            <Image src={view} alt="view pet icon" />
          </Button>
        </Link>

      </Card>
    </>
  );
}

PetCard.propTypes = {
  petObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    petName: PropTypes.string,
    species: PropTypes.string,
    petAvatar: PropTypes.string,
    color: PropTypes.string,
    petAge: PropTypes.string,
  }).isRequired,
};
