import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Projects = lazy(() => import('../pages/Projects'));
const CreateProject = lazy(() =>
  import('../pages/CreateProject')
);
const EditProject = lazy(() =>
  import('../pages/EditProject')
);
const Contacts = lazy(() => import('../pages/Contacts'));
const CreatePost = lazy(() =>
  import('../pages/CreatePost')
);
const EditPost = lazy(() => import('../pages/EditPost'));
const Blog = lazy(() => import('../pages/Blog'));
const Auth = lazy(() => import('../pages/Auth'));
const Article = lazy(() => import('../Article'));
const PageNotFound = lazy(() =>
  import('../PageNotFound/PageNotFound')
);

const Routes = ({ token, isAuthenticated, user }) => {
  const isAuth = (onlyAdmin = false) => {
    if (onlyAdmin) {
      return (
        token &&
        isAuthenticated &&
        user &&
        user.role === 'admin'
      );
    }

    return token && isAuthenticated;
  };

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <PrivateRoute
        path="/projects/edit-project/:id"
        component={EditProject}
        isAuth={isAuth()}
        exact
      />
      <PrivateRoute
        path="/projects/create-project"
        component={CreateProject}
        isAuth={isAuth()}
        exact
      />
      <Route path="/projects" component={Projects} exact />
      <Route path="/contacts" component={Contacts} exact />
      <PrivateRoute
        path="/blog/edit-post/:id"
        component={EditPost}
        isAuth={isAuth()}
        exact
      />
      <Route
        path="/blog/:title/:id"
        component={Article}
        exact
      />
      <PrivateRoute
        path="/blog/create-post"
        component={CreatePost}
        isAuth={isAuth()}
        exact
      />
      <Route path="/blog" component={Blog} exact />
      <Route
        path="/auth"
        render={() => <Auth isAuth={isAuth()} />}
        exact
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = ({
  auth: { token, isAuthenticated, user }
}) => ({ token, isAuthenticated, user });

export default connect(mapStateToProps)(Routes);
