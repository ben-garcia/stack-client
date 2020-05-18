import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { sendRequest } from 'api';
import { Button } from 'components';
import { userLoggedOut } from 'store/user';
import './styles.scss';

const MenuDrawer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = async () => {
    // send request to delete session on the server
    const response = await sendRequest({
      url: '/auth/logout',
      method: 'POST',
    });
    // eslint-disable-next-line
    console.log(response);
    // delete everything from local storage
    localStorage.clear();
    // redirect to the landing page
    history.replace('/');
    // dispatch action to set user.loggedIn to false
    dispatch(userLoggedOut());
  };

  return (
    <div className="menu-drawer">
      <Button
        className="menu-drawer__button"
        color="transparent"
        onClick={() => logout()}
        type="button"
      >
        Logout
      </Button>
    </div>
  );
};

export default MenuDrawer;
