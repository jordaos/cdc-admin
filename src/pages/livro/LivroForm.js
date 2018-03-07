import React, { Component } from 'react';
import { Button, Row, Input } from 'react-materialize';
import axios from 'axios';
import PubSub from 'pubsub-js';

class LivroForm extends Component {
  constructor() {
    super();
    this.state = { titulo: '', preco: '', autorId: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var titulo = this.state.titulo.trim();
    var preco = this.state.preco.trim();
    var autorId = this.state.autorId.trim();

    axios.post('http://cdc-react.herokuapp.com/api/livros', {
      titulo: titulo,
      preco: preco,
      autorId: autorId
    })
      .then((response) => {
        this.setState({ titulo: '', preco: '', autorId: '', selectedOption: '' });
        PubSub.publish('atualiza-lista-livros', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Row>
        <form className="col m9 l7" onSubmit={this.handleSubmit}>
          <Input type="text"
            required
            pattern=".{5,}"
            name="titulo"
            className="validate"
            s={12}
            label="Titulo"
            value={this.state.titulo}
            onChange={this.handleChange} />
          <Input type="number"
            required
            name="preco"
            className="validate"
            s={12}
            label="Preço"
            value={this.state.preco}
            onChange={this.handleChange} />
          <Input s={12} type="select" 
            label="Autor"
            onChange={this.handleChange}
            value={this.state.autorId}
            name="autorId">
            <option value="0">Selecione</option>
            {
              this.props.autores.map((autor) => {
                return (
                  <option value={autor.id} key={autor.id}>{autor.nome}</option>
                );
              })
            }
          </Input>
          <Button type="submit">Enviar</Button>
        </form>
      </Row>
    );
  }
}

export default LivroForm;