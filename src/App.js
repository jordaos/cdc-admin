import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Home from './pages/home/Home';
import Autor from './pages/autor/Autor';

import './css/pure-min.css';
import './css/side-menu.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
          </a>

          <div id="menu">
            <div className="pure-menu">
              <a className="pure-menu-heading" href="http://localhost:3000">Company</a>

              <ul className="pure-menu-list">
                <li className="pure-menu-item"><NavLink to="/" exact className="pure-menu-link" activeClassName="pure-menu-selected">Home</NavLink></li>
                <li className="pure-menu-item"><NavLink to="/autor" className="pure-menu-link" activeClassName="pure-menu-selected">Autores</NavLink></li>
                <li className="pure-menu-item"><NavLink to="/livro" className="pure-menu-link" activeClassName="pure-menu-selected">Livros</NavLink></li>
              </ul>
            </div>
          </div>

          <Route exact path="/" component={ Home } />
          <Route path="/autor" component={ Autor } />
        </div>
      </Router>
    );
  }
}

export default App;
