import React, { Component } from 'react';

class Result extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderResult: false
    }
  }

  render() {
    var formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    return (
      <div className="result">
        <div>
          <label>Me identifico: </label>
          <strong>{this.props.data['Me identifico']}</strong>
        </div>
        <div>
          <label>Tengo: </label>
          <strong>{this.props.data['Tengo']}</strong>
        </div>
        <div>
          <label>Trabajo en: </label>
          <strong>{this.props.data['Argentina']}</strong>
        </div>
        <div>
          <label>Años de experiencia: </label>
          <strong>{this.props.data['Años de experiencia']}</strong>
        </div>
        <div>
          <label>Años en el puesto actual: </label>
          <strong>{this.props.data['Años en el puesto actual']}</strong>
        </div>
        <div>
          <label>¿Cuánta gente a cargo?: </label>
          <strong>{this.props.data['¿Cuánta?']}</strong>
          </div>
        <div>
          <label>Nivel de estudios alcanzado: </label>
          <strong>{this.props.data['Nivel de estudios alcanzado'] ? this.props.data['Nivel de estudios alcanzado'] : '-'}</strong>
        </div>
        <div>
          <label>Estado: </label>
          <strong>{this.props.data['Estado'] ? this.props.data['Estado'] : '-'}</strong>
        </div>
        <div>
          <label>¿Estudiaste una carrera relacionada a Informática?: </label>
          <strong>
            {{
              'Ingeniería informática': 'Sí',
              '': 'No',
            }[this.props.data['Carrera']]}
          </strong>
        </div>
        <div>
          <label>Trabajo de: </label>
          <strong>{this.props.data['Trabajo de'] ? this.props.data['Trabajo de'] : '-'}</strong>
        </div>
        <div><label>Tecnologías que utilizás: </label><strong>{
          this.props.data['Tecnologías que utilizás'].concat(
            this.props.data['Tecnologías que utilizás.1'],
            this.props.data['Tecnologías que utilizás.2'],
            this.props.data['Tecnologías que utilizás.3'],
            this.props.data['Tecnologías que utilizás.4']
          ).join(', ')
        }</strong></div>
        <div>
          <label>Cantidad de empleados en la empresa: </label>
          <strong>{this.props.data['Cantidad de empleados']}</strong>
        </div>
        <div>
          <label>Beneficios Extra: </label>
          <strong>{this.props.data['Beneficios Extra'].length > 0 ? this.props.data['Beneficios Extra'].join(', ') : '-'}</strong>
        </div>
        <div>
          <label>Sueldo estimado (rfr2): </label>
          <strong>{this.props.salary && this.props.salary.rfr2 && formatter.format(this.props.salary.rfr2)}</strong>
        </div>
        <div>
          <label>Sueldo estimado (rfr): </label>
          <strong>{this.props.salary && this.props.salary.rfr && formatter.format(this.props.salary.rfr)}</strong>
        </div>
        <div>
          <label>Sueldo estimado (lr): </label>
          <strong>{this.props.salary && this.props.salary.lr && formatter.format(this.props.salary.lr)}</strong>
        </div>
        <div>
          <label>Sueldo estimado (knn): </label>
          <strong>{this.props.salary && this.props.salary.knn && formatter.format(this.props.salary.knn)}</strong>
        </div>
        <div className="error">{this.props.error}</div>
      </div>
    )
  }
}

export default Result