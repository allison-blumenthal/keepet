import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
    </>
  );
}

export default Home;
