import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contacts from '../pages/Contacts';
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/article/:title/:id">
            <Article />
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
