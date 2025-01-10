import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData } from './features/gitUserSlice'; 
import './index.css'

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface AppState {
  gitUser: {
    users: User[];
    error: string | null;
    loading: boolean;
  };
}

const FetchAPI: React.FC = () => {
  const dispatch = useDispatch();
  const { users, error, loading }: AppState['gitUser'] = useSelector(
    (state: { gitUser: AppState['gitUser'] }) => state.gitUser
  );

 
  useEffect(() => {
    if (!users.length) {
      dispatch(getAllData());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <h1>Fetch API Using Redux</h1>
      <button onClick={() => dispatch(getAllData())}>Get Github Users</button>
      {users.length >0 ? (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <img src={user.avatar_url} alt={user.login} width={50} />
              <h5>{user.login}</h5>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
    </>
  );
};

export default FetchAPI;
