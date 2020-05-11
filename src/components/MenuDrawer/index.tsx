import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'components';
import './styles.scss';

const MenuDrawer: React.FC = () => {
  const history = useHistory();
  const logout = () => {
    // delete everything from local storage
    localStorage.clear();
    // redirect to the landing page
    history.replace('/');
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
