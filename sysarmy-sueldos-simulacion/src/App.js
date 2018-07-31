import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar/Navbar'
import Form from './Form/Form'
import ResultList from './ResultList/ResultList'

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      changedSinceSubmitted: true,
      answers: {
        'Me identifico': '',
        'Tengo': 'Menos de 18 años',
        'Argentina': 'Ciudad Autónoma de Buenos Aires',
        'Años de experiencia': 'Menos de un año',
        'Años en el puesto actual': 'Menos de un año',
        'Nivel de estudios alcanzado': '',
        'Estado': '',
        'Trabajo de': '',
        '¿Cuánta?': '0',
        'Tecnologías que utilizás': [],
        'Tecnologías que utilizás.1': [],
        'Tecnologías que utilizás.2': [],
        'Tecnologías que utilizás.3': [],
        'Tecnologías que utilizás.4': [],
        'Cantidad de empleados': '1-10',
        'Beneficios Extra': [],
      },
      'results': []
    };
  }

  handleChange = (key, value) =>{
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Form handleChange={this.handleChange} answers={this.state.answers} results={this.state.results} />
        <ResultList answers={this.state.answers} results={this.state.results} />
      </div>
    );
  }
}

export default App;
