import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuLink = ({
  title,
  path,
  handleClick,
  exact = false
}) => {
  return (
    <li className="nav-link-item" onClick={handleClick}>
      <NavLink
        to={path}
        activeClassName="active"
        exact={exact}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default MenuLink;
