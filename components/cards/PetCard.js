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
          <Card.Title className="muller-bold-sm center">{petObj.petName}</Card.Title>
          <h3 className="muller-med-sm center">{petObj.species}</h3>
        </Card.Body>
        <Link href={`/pet/${petObj.firebaseKey}`} passHref>
          <Button className="arrow-btn">
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
  }).isRequired,
};
