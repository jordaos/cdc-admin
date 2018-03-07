import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

import LivroForm from './LivroForm';
import PaginationTable from './../../components/PaginationTable';

class Livro extends Component {
  constructor() {
    super();
    this.state = { lista: [], autores: [] };
  }

  componentWillMount() {
    axios.get('http://cdc-react.herokuapp.com/api/livros')
      .then((response) => {
        this.setState({ lista: response.data.reverse() });
      })
      .catch((error) => {
        console.log(error);
      });

    PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
      this.setState({ lista: novaLista.reverse() });
    });

    axios.get('http://cdc-react.herokuapp.com/api/autores')
      .then((response) => {
        let novaLista = [];
        for (let i = 0; i < 10; i++) {
          novaLista.push(response.data[i]);
        }
        this.setState({ autores: novaLista });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h4>Cadastro de Livros</h4>
        <LivroForm autores={this.state.autores} />
        <br />
        <PaginationTable lista={this.state.lista} columns={
          [
            {
              Header: "ID",
              accessor: "id"
            },
            {
              Header: "Titulo",
              accessor: "titulo"
            },
            {
              Header: "Preço",
              accessor: "preco"
            },
            {
              Header: "Autor",
              accessor: "autor.nome"
            }
          ]
        } />
      </div>
    );
  }
}

export default Livro;