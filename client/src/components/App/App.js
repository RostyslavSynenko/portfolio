import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../HOC';
import Routes from '../Routes';
import Header from '../Header';
import Footer from '../Footer';
import PageLoader from '../PageLoader';
import { loadUser, clearErrors } from '../../actions';

const App = ({ loadUser, clearErrors }) => {
  useEffect(() => {
    (async () => {
      await loadUser();

      clearErrors();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    { loadUser: loadUser(httpService), clearErrors },
    dispatch
  );

export default withHttpService()(
  connect(null, mapDispatchToProps)(App)
);
