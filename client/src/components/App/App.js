import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contacts from '../pages/Contacts';
import CreatePost from '../pages/CreatePost';
import Blog from '../pages/Blog';
import Article from '../Article';
import Footer from '../Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

const App = () => {
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
          <Route path="/projects" exact>
            <Projects />
          </Route>
          <Route path="/contacts" exact>
            <Contacts />
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
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
