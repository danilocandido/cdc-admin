import React, { Component } from 'react';
import $ from 'jquery'; //apelido -> $ from 'jquery'
import InputCustomizado from './componentes/InputCustomizado';

export class FormularioAutor extends Component {

  constructor() {
    super();
    this.state = { nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"></InputCustomizado>
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"></InputCustomizado>
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"></InputCustomizado>

          <div className="pure-control-group">                                  
            <label></label> 
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
          </div>
        </form>             
      </div>  
    );
  }

  enviaForm(evento){
    evento.preventDefault();
    
    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',  
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify( {nome: this.state.nome, email: this.state.email, senha: this.state.senha} ),
      success: function(resposta){
        this.setState({lista: resposta});
      }.bind(this),
      error: function(resposta){
        console.log('erro');
      }
    });
  }

  setNome(evento){
    this.setState({nome: evento.target.value});
  }

  setEmail(evento){
    this.setState({email: evento.target.value});
  }

  setSenha(evento){
    this.setState({senha: evento.target.value});
  }
}


export class TabelaAutores extends Component {

  constructor() {
    super();
    this.state = { lista: [] };
  }

  //Componente acabou de ser montado - depois do render
  componentDidMount(){
    $.ajax({
      // http://cdc-react.herokuapp.com/api/autores
      // http://localhost:8080/api/autores
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: 'json',
      success: function(resposta){
        this.setState({lista: resposta}); //toda vez q o setState é chamado o render vai ser chamado depois
      }.bind(this) //Aqui usamos a function bind() pra dizer que queremos usar o this do react e não o do jquery
    });
  }
  
  render(){
    return(
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.lista.map(function(autor) {
                return (
                  <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table> 
      </div>  
    );
  }
}
