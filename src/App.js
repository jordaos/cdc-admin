import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Home from './pages/home/Home';
import Autor from './pages/autor/Autor';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="light-blue lighten-1">
            <div className="nav-wrapper container">
              <ul className="right hide-on-med-and-down">
                <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/autor" activeClassName="active">Autores</NavLink></li>
                <li><NavLink to="/livro" activeClassName="active">Livros</NavLink></li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/autor" activeClassName="active">Autores</NavLink></li>
                <li><NavLink to="/livro" activeClassName="active">Livros</NavLink></li>
              </ul>
              <a href="" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>

          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/autor" component={Autor} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
