import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

import PaginationTable from './../../components/PaginationTable';
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
        <h4>Cadastro de Autores</h4>
        <AutorForm />
        <br />
        <PaginationTable lista={this.state.lista} columns={
          [
            {
              Header: "ID",
              accessor: "id"
            },
            {
              Header: "Nome",
              accessor: "nome"
            },
            {
              Header: "E-mail",
              accessor: "email"
            }
          ]
        } />
      </div>
    );
  }
}

export default Autor;