import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuLink = ({
  title,
  path,
  handlerClick,
  exact = false
}) => {
  return (
    <li onClick={handlerClick} className="nav-link-item">
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
