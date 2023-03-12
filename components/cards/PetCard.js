import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function PetCard({ petObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={`/assets/images/petAvatars/${petObj.petAvatar}`} alt="Pet's Avatar" style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{petObj.petName}</Card.Title>
          <h3 className="card-text bold">{petObj.species}</h3>
          <Link href={`/pet/${petObj.firebaseKey}`} passHref>
            <Button variant="primary" className="view-btn">View Pet</Button>
          </Link>
        </Card.Body>
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
