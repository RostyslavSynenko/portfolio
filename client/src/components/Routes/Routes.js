import React, { lazy } from 'react';
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

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/about" component={About} exact />
    <PrivateRoute
      path="/projects/edit-project/:id"
      component={EditProject}
      exact
    />
    <PrivateRoute
      path="/projects/create-project"
      component={CreateProject}
      exact
    />
    <Route path="/projects" component={Projects} exact />
    <Route path="/contacts" component={Contacts} exact />
    <PrivateRoute
      path="/blog/edit-post/:id"
      component={EditPost}
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
      exact
    />
    <Route path="/blog" component={Blog} exact />
    <Route path="/auth" component={Auth} exact />
    <Route path="*" component={PageNotFound} />
  </Switch>
);

export default Routes;
