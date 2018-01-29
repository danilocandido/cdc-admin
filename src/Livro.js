import React, { Component } from 'react';
import $ from 'jquery'; //apelido -> $ from 'jquery'
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class TabelaLivros extends Component {
  
  render(){
    return(
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>Ttulo</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map(function(livro) {
                return (
                  console.log(livro),
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.preco}</td>
                    <td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component{

  constructor() {
    super();
    this.state = { lista: [] };
  }

  //Componente acabou de ser montado - depois do render
  componentDidMount(){
    $.ajax({
      // http://cdc-react.herokuapp.com/api/autores
      // http://localhost:8080/api/autores
      url: "http://cdc-react.herokuapp.com/api/livros",
      dataType: 'json',
      success: function(resposta){
        this.setState({lista: resposta}); //toda vez q o setState é chamado o render vai ser chamado depois
      }.bind(this) //Aqui usamos a function bind() pra dizer que queremos usar o this do react e não o do jquery
    });

    //Estamos escutando o 'atualiza-listagem-autores' e recebemos a nova lista
    PubSub.subscribe('atualiza-listagem-livros', function(topico, novaLista){
      this.setState({lista: novaLista});
    }.bind(this));
    //
  }

  render(){
    return(
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
          
        <div className="content" id="content">
          <TabelaLivros lista={this.state.lista}/>
        </div>
      </div>
    );
  }
}
