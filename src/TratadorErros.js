import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class TratadorErros{

  publicaErros(erros) {
    for(var i=0; i < erros.errors.length; i++){
      var erro = erros.errors[i];
      PubSub.publish('erro-validacao', erro);
    }  
  }

  componentDidMount() {
    PubSub.subscribe('erro-validacao', function(topico, erro) {
      if(erro.field === this.props.name){
        this.setState({msgErro: erro.defaultMessage});
      }
    }.bind(this));
  }
}
