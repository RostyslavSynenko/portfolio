import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../../../../actions';

const Logout = ({ logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <li className="nav-link-item" onClick={handleLogout}>
      <button>Logout</button>
    </li>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(Logout);
