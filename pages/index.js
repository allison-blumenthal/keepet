import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
// import { getHouseholds } from '../api/householdData';

export default function Home() {
  // const [households, setHouseholds] = useState([]);
  const { user } = useAuth();
  // const displayHouseholds = () => {
  //   getHouseholds(user.uid).then(setHouseholds);
  // };

  return (
    <>
      <Head>
        <title>Choose Household</title>
      </Head>
      <h1>Hello {user.displayName}! </h1>
      <p>Choose your household, or create a new one</p>
      {/* <div className="household-card-container">{households.map((household) => (
        // <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
      ))}
      </div> */}
      <div>
        <Button className="create-household-btn" variant="success">Create Household</Button>
      </div>
    </>
  );
}
