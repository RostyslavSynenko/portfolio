import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../HOC';
import Header from '../Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import CreateProject from '../pages/CreateProject';
import EditProject from '../pages/EditProject';
import Contacts from '../pages/Contacts';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import Blog from '../pages/Blog';
import Auth from '../Auth';
import Article from '../Article';
import Footer from '../Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
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
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/projects/edit-project/:id" exact>
            <EditProject />
          </Route>
          <Route path="/projects/create-project" exact>
            <CreateProject />
          </Route>
          <Route path="/projects" exact>
            <Projects />
          </Route>
          <Route path="/contacts" exact>
            <Contacts />
          </Route>
          <Route path="/blog/edit-post/:id" exact>
            <EditPost />
          </Route>
          <Route path="/blog/:title/:id" exact>
            <Article />
          </Route>
          <Route path="/blog/create-post" exact>
            <CreatePost />
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
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
