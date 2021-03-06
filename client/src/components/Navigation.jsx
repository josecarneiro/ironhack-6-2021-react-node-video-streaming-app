import React from 'react';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PaymentIcon from '@mui/icons-material/Payment';

const Navigation = (props) => {
  return (
    <nav>
      <Link to="/">
        <EmojiObjectsIcon />
        <span style={{ display: 'none' }}>Edflix</span>
      </Link>
      {(props.user && (
        <>
          <button onClick={props.onSignOut}>
            <LogoutIcon />
            <span style={{ display: 'none' }}>Sign Out</span>
          </button>
          <Link to="/settings">
            <SettingsIcon />
            <span style={{ display: 'none' }}>
              {props.user.name}'s Settings
            </span>
          </Link>
        </>
      )) || (
        <>
          <Link to="/sign-up">
            <LoginIcon />
            <span style={{ display: 'none' }}>Sign Up</span>
          </Link>
          <Link to="/sign-in">
            <LoginIcon />
            <span style={{ display: 'none' }}>Sign In</span>
          </Link>
          <Link to="/sign-up-creator">
            <LoginIcon />
            <span style={{ display: 'none' }}>Sign Up as Creator</span>
          </Link>
        </>
      )}
      {props.user && props.user.role === 'viewer' && (
        <>
          <Link to="/subscription">
            <PaymentIcon />
            <span style={{ display: 'none' }}>Manage Subscription</span>
          </Link>
        </>
      )}
      {props.user && props.user.role === 'creator' && (
        <>
          <Link to="/course/list">
            <ListAltIcon />
            <span style={{ display: 'none' }}>Course List</span>
          </Link>
          <Link to="/course/create">
            <ControlPointIcon />
            <span style={{ display: 'none' }}>Create Course</span>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
