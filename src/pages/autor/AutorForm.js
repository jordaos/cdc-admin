import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import MyInput from './../../components/form/MyInput';

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
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <MyInput id="nome" type="text" name="nome" label="Nome"
            value={this.state.nome}
            onChange={this.handleChange} />
          <MyInput id="email" type="text" name="email" label="E-mail"
            value={this.state.email}
            onChange={this.handleChange} />
          <MyInput id="senha" type="password" name="senha" label="Senha"
            value={this.state.senha}
            onChange={this.handleChange} />
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AutorForm;