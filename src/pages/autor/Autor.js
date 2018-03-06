import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

import AutorTable from './AutorTable';
import AutorForm from './AutorForm';

class Autor extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
    axios.get('http://cdc-react.herokuapp.com/api/autores')
      .then((response) => {
        this.setState({ lista: response.data.reverse() });
      })
      .catch((error) => {
        console.log(error);
      });

    PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
      this.setState({ lista: novaLista.reverse() });
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <AutorForm />
          <br />
          <AutorTable lista={this.state.lista} />
        </div>
      </div>
    );
  }
}

export default Autor;