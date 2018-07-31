import React, { Component } from 'react';
import './Result.css'

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
        <div className="result-salary-container">
          <div className="result-gray-bg">
            <div className="result-model">
              <label>Modelo</label>
            </div>
            <div className="result-salary">
              <strong>Salario estimado</strong>
            </div>
          </div>
          <div>
            <div className="result-model">
              <label>rfr2</label>
            </div>
            <div className="result-salary">
              <strong>{this.props.salary && this.props.salary.rfr2 && formatter.format(this.props.salary.rfr2)}</strong>
            </div>
          </div>
          <div className="result-gray-bg">
            <div className="result-model">
              <label>rfr</label>
            </div>
            <div className="result-salary">
              <strong>{this.props.salary && this.props.salary.rfr && formatter.format(this.props.salary.rfr)}</strong>
            </div>
          </div>
          <div>
            <div className="result-model">
              <label>lr</label>
            </div>
            <div className="result-salary">
              <strong>{this.props.salary && this.props.salary.lr && formatter.format(this.props.salary.lr)}</strong>
            </div>
          </div>
          <div className="result-gray-bg">
            <div className="result-model">
              <label>knn</label>
            </div>
            <div className="result-salary">
              <strong>{this.props.salary && this.props.salary.knn && formatter.format(this.props.salary.knn)}</strong>
            </div>
          </div>
        </div>
        <div className="error">{this.props.error}</div>
      </div>
    )
  }
}

export default Result