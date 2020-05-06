import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Header from '../Header';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contacts from '../pages/Contacts';
import Blog from '../pages/Blog';
import Footer from '../Footer';

function App() {
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
          <Route path="/blog" exact>
            <Blog />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
