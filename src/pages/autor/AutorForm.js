import React, { Component } from 'react';
import { Button, Row, Input } from 'react-materialize';
import axios from 'axios';
import PubSub from 'pubsub-js';

class AutorForm extends Component {
  constructor() {
    super();
    this.state = { nome: '', email: '', senha: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + ": " + value);
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var nome = this.state.nome.trim();
    var email = this.state.email.trim();
    var senha = this.state.senha.trim();

    axios.post('http://cdc-react.herokuapp.com/api/autores', {
      nome: nome,
      email: email,
      senha: senha
    })
      .then((response) => {
        this.setState({ nome: '', email: '', senha: '' });
        PubSub.publish('atualiza-lista-autores', response.data);
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
            name="nome"
            className="validate"
            s={12}
            label="Nome"
            value={this.state.nome}
            onChange={this.handleChange} />
          <Input type="email"
            required
            pattern=".{8,}"
            name="email"
            className="validate"
            s={12}
            label="E-mail"
            value={this.state.email}
            onChange={this.handleChange} />
          <Input type="password"
            required
            pattern=".{5,}"
            name="senha"
            className="validate"
            s={12}
            label="Senha"
            value={this.state.senha}
            onChange={this.handleChange} />
            <Button type="submit">Enviar</Button>
        </form>
      </Row>
    );
  }
}

export default AutorForm;