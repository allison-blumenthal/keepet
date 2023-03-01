import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>Hello {user.displayName}! </h1>
      <p>Choose your household, or create a new one</p>
      <div>
        {/* household card component  */}
        <Button className="create-household-btn" variant="success">Create Household</Button>
      </div>
    </>
  );
}

export default Home;
