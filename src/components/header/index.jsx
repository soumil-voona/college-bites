import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav className="topLoginThing">
      <style>
        {`
          .topLoginThing {
            position: relative;
            display: flex;
            justify-content: flex-end;
            padding: 10px;
          }

          .logout {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .logout:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      {
        userLoggedIn
          ?
          <>
            <button onClick={() => { doSignOut().then(() => { navigate('/Information') }) }} className='logout'>
              Logout
            </button>
          </>
          :
          <>
          </>
      }
    </nav>
  );
}

export default Header;
