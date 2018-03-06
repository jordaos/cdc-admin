import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css'

class Home extends Component {
  render() {
    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          <br />
          <h1 className="header center orange-text">Bem-vindo</h1>
          <div className="row center">
            <h5 className="header col s12 light">Aqui você poderá cadastrar autores e suas publicações.</h5>
          </div>
          <div className="row center">
            <Link to="/autor" id="download-button" className="btn-large waves-effect waves-light orange">Começar</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;