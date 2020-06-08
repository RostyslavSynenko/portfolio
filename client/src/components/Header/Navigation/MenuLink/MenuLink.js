import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuLink = ({
  title,
  path,
  handlerClick,
  exact = false
}) => {
  return (
    <li className="nav-link-item" onClick={handlerClick}>
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
