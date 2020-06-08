import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import CreateProject from '../pages/CreateProject';
import EditProject from '../pages/EditProject';
import Contacts from '../pages/Contacts';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import Blog from '../pages/Blog';
import Auth from '../pages/Auth';
import Article from '../Article';
import PageNotFound from '../PageNotFound/PageNotFound';

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/about" component={About} exact />
    <Route
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
    <Route
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
