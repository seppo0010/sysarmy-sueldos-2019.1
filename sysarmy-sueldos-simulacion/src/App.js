import React, { Component } from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const PREDICT_URL = 'http://98.234.196.35.bc.googleusercontent.com:8180/predict'

const tech = {
  'Tecnologías que utilizás': ['Linux', '*BSD', 'AIX', 'OpenStack', 'Solaris', 'HP-UX', 'VMWare', 'Docker / Containers', 'Azure', 'Amazon Web Services'],
  'Tecnologías que utilizás.1': ['HTML', 'CSS', 'Javascript', 'jQuery', 'Java', 'PHP', 'Python', '.NET', 'NodeJS', 'C#', 'Ruby', 'Perl', 'Go', 'Scala', 'VB*', 'C++', 'C', 'ABAP', 'Swift', 'Objective-C'],
  'Tecnologías que utilizás.3': ['Selenium', 'Visual Studio Coded UI', 'OpenQA', 'HP LoadRunner', 'Test Complete', 'Watir', 'Postman', 'RSpec', 'JMeter'],
  'Tecnologías que utilizás.4': ['Oracle', 'MSSQL', 'MySQL', 'MariaDB', 'PostgreSQL', 'SQL', 'Redis', 'MongoDB', 'Hadoop', 'Cassandra', 'Google bigQuery'],
}

const benefits = [
    'Horarios flexibles',
    'WFH',
    'Laptop',
    'Aumento por inflación',
    'Capacitaciones y/o cursos',
    'Clases de idiomas',
    'Descuentos en gimnasios',
    'snacks',
    'bebidas',
    'golosinas',
    'Abono de celular y/o Internet',
    'Comidas pagas',
    'Bonos por desempeño',
]

class Result extends Component {
  render() {
    var formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    return (
      <div className="result">
        <div><label>Me identifico: </label><strong>{this.props.data['Me identifico']}</strong></div>
        <div><label>Tengo: </label><strong>{this.props.data['Tengo']}</strong></div>
        <div><label>Trabajo en: </label><strong>{this.props.data['Argentina']}</strong></div>
        <div><label>Años de experiencia: </label><strong>{this.props.data['Años de experiencia']}</strong></div>
        <div><label>Años en el puesto actual: </label><strong>{this.props.data['Años en el puesto actual']}</strong></div>
        <div><label>¿Cuánta gente a cargo?: </label><strong>{this.props.data['¿Cuánta?']}</strong></div>
        <div><label>Nivel de estudios alcanzado: </label><strong>{this.props.data['Nivel de estudios alcanzado']}</strong></div>
        <div><label>Estado: </label><strong>{this.props.data['Estado']}</strong></div>
        <div><label>¿Estudiaste una carrera relacionada a Informática?: </label><strong>{{
          'Ingeniería informática': 'Sí',
          '': 'No',
        }[this.props.data['Carrera']]}</strong></div>
        <div><label>Trabajo de: </label><strong>{this.props.data['Trabajo de']}</strong></div>
        <div><label>Tecnologías que utilizás: </label><strong>{
          this.props.data['Tecnologías que utilizás'].concat(
            this.props.data['Tecnologías que utilizás.1'],
            this.props.data['Tecnologías que utilizás.2'],
            this.props.data['Tecnologías que utilizás.3'],
            this.props.data['Tecnologías que utilizás.4']
          ).join(', ')
        }</strong></div>
        <div><label>Cantidad de empleados en la empresa: </label><strong>{this.props.data['Cantidad de empleados']}</strong></div>
        <div><label>Beneficios Extra: </label><strong>{this.props.data['Beneficios Extra'].join(', ')}</strong></div>
        <div><label>Sueldo estimado (rfr2): </label><strong>{this.props.salary && this.props.salary.rfr2 && formatter.format(this.props.salary.rfr2)}</strong></div>
        <div><label>Sueldo estimado (rfr): </label><strong>{this.props.salary && this.props.salary.rfr && formatter.format(this.props.salary.rfr)}</strong></div>
        <div><label>Sueldo estimado (lr): </label><strong>{this.props.salary && this.props.salary.lr && formatter.format(this.props.salary.lr)}</strong></div>
        <div><label>Sueldo estimado (knn): </label><strong>{this.props.salary && this.props.salary.knn && formatter.format(this.props.salary.knn)}</strong></div>
        <div className="error">{this.props.error}</div>
      </div>
    )
  }
}

class App extends Component {
  state = {
    changedSinceSubmitted: true,
    answers: {
      'Me identifico': '',
      'Tengo': '',
      'Argentina': '',
      'Años de experiencia': '',
      'Años en el puesto actual': '',
      'Nivel de estudios alcanzado': '',
      'Estado': '',
      'Trabajo de': '',
      '¿Cuánta?': '',
      'Tecnologías que utilizás': [],
      'Tecnologías que utilizás.1': [],
      'Tecnologías que utilizás.2': [],
      'Tecnologías que utilizás.3': [],
      'Tecnologías que utilizás.4': [],
      'Cantidad de empleados': '',
      'Beneficios Extra': [],
    },
    'results': []
  };

  handleChange = event => {
    this.setState({changedSinceSubmitted: true})
    const key = event.target.name
    const val = event.target.value
    if (Array.isArray(this.state.answers[key])) {
      const index = this.state.answers[key].indexOf(val)
      if (index >= 0) {
        const arr = this.state.answers[key].concat([])
        arr.splice(index, 1)
        this.setState({ answers: Object.assign({}, this.state.answers, { [key]: arr }) });
      } else {
        this.setState({ answers: Object.assign({}, this.state.answers, { [key]: this.state.answers[key].concat([val]) }) });
      }
    } else {
      this.setState({ answers: Object.assign({}, this.state.answers, { [key]: val }) });
    }
  };

  calculateSalary = () => {
    this.setState({changedSinceSubmitted: false})
    const answers = Object.assign({}, this.state.answers)
    const index = this.state.results.length
    this.setState({results: this.state.results.concat([{answers}]) })

    var request = new XMLHttpRequest();
    request.open('POST', PREDICT_URL, true);
    request.onload = function() {
      let newResults = this.state.results.concat([])
      try {
        var data = JSON.parse(request.responseText);
        if (request.status >= 200 && request.status < 400) {
          newResults[index] = Object.assign({}, {answers}, {salary: data})
        } else {
          newResults[index] = Object.assign({}, {answers}, {error: `HTTP Status ${request.status}`})
        }
      } catch (e) {
        newResults[index] = Object.assign({}, {answers}, {error: `json error (${e})`})
      }
      this.setState({results: newResults})
    }.bind(this);
    request.onerror = function() {
      let newResults = this.state.results.concat([])
      newResults[index] = Object.assign({}, answers, {error: 'request error'})
      this.setState({results: newResults})
    }.bind(this);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(Object.keys(this.state.answers).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.state.answers[key])}`).join('&'));
  }

  render() {
    return (
      <div className="App">
        <div>
          <FormControl component="fieldset" required className="form-element">
            <FormLabel component="legend">Me identifico</FormLabel>
            <RadioGroup
              aria-label="Me identifico"
              name="Me identifico"
              value={this.state.answers['Me identifico']}
              onChange={this.handleChange}
            >
              <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
              <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
              <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Tengo">Tengo</InputLabel>
            <Select
              value={this.state.answers['Tengo']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Tengo',
                id: 'Tengo',
              }}
            >
              <MenuItem value="Menos de 18 años">Menos de 18 años</MenuItem>
              <MenuItem value="18 - 20">18 - 20</MenuItem>
              <MenuItem value="21 - 23">21 - 23</MenuItem>
              <MenuItem value="24 - 26">24 - 26</MenuItem>
              <MenuItem value="27 - 30">27 - 30</MenuItem>
              <MenuItem value="31 - 33">31 - 33</MenuItem>
              <MenuItem value="34 - 36">34 - 36</MenuItem>
              <MenuItem value="37 - 40">37 - 40</MenuItem>
              <MenuItem value="41 - 45">41 - 45</MenuItem>
              <MenuItem value="46 - 49">46 - 49</MenuItem>
              <MenuItem value="50+">50+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Argentina">Trabajo en</InputLabel>
            <Select
              value={this.state.answers['Argentina']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Argentina',
                id: 'Argentina',
              }}
            >
              <MenuItem value="Chaco">Chaco</MenuItem>
              <MenuItem value="Chubut">Chubut</MenuItem>
              <MenuItem value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</MenuItem>
              <MenuItem value="Córdoba">Córdoba</MenuItem>
              <MenuItem value="Formosa">Formosa</MenuItem>
              <MenuItem value="GBA">GBA</MenuItem>
              <MenuItem value="La Pampa">La Pampa</MenuItem>
              <MenuItem value="Mendoza">Mendoza</MenuItem>
              <MenuItem value="Neuquén">Neuquén</MenuItem>
              <MenuItem value="Provincia de Buenos Aires">Provincia de Buenos Aires</MenuItem>
              <MenuItem value="Río Negro">Río Negro</MenuItem>
              <MenuItem value="San Juan">San Juan</MenuItem>
              <MenuItem value="San Luis">San Luis</MenuItem>
              <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
              <MenuItem value="Santa Fe">Santa Fe</MenuItem>
              <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
              <MenuItem value="Tierra del Fuego">Tierra del Fuego</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Años de experiencia">Años de experiencia</InputLabel>
            <Select
              value={this.state.answers['Años de experiencia']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Años de experiencia',
                id: 'Años de experiencia',
              }}
            >
              <MenuItem value="Menos de un año">Menos de un año</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10+">10+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Años en el puesto actual">Años en el puesto actual</InputLabel>
            <Select
              value={this.state.answers['Años en el puesto actual']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Años en el puesto actual',
                id: 'Años en el puesto actual',
              }}
            >
              <MenuItem value="Menos de un año">Menos de un año</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10+">10+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <TextField
              id="¿Cuánta?"
              name="¿Cuánta?"
              label="¿Cuánta gente a cargo? (si no tenés, poné 0)"
              value={this.state.answers['¿Cuánta?']}
              onChange={this.handleChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0,
              }}
              margin="normal"
            />
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Nivel de estudios alcanzado">Nivel de estudios alcanzado</InputLabel>
            <Select
              value={this.state.answers['Nivel de estudios alcanzado']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Nivel de estudios alcanzado',
                id: 'Nivel de estudios alcanzado',
              }}
            >
              <MenuItem value="Primario">Primario</MenuItem>
              <MenuItem value="Secundario">Secundario</MenuItem>
              <MenuItem value="Terciario">Terciario</MenuItem>
              <MenuItem value="Universitario">Universitario</MenuItem>
              <MenuItem value="Posgrado">Posgrado</MenuItem>
              <MenuItem value="Doctorado">Doctorado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Estado">Estado</InputLabel>
            <Select
              value={this.state.answers['Estado']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Estado',
                id: 'Estado',
              }}
            >
              <MenuItem value="En curso">En curso</MenuItem>
              <MenuItem value="Incompleto">Incompleto</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿Estudiaste una carrera relacionada a Informática? (Lic. en Sistemas, Ingeniería Informática, etc)</FormLabel>
            <RadioGroup
              aria-label="¿Estudiaste una carrera relacionada a Informática? (Lic. en Sistemas, Ingeniería Informática, etc)"
              name="Carrera"
              value={this.state.answers['Carrera']}
              onChange={this.handleChange}
            >
              <FormControlLabel value="Ingeniería informática" control={<Radio />} label="Sí" />
              <FormControlLabel value="" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Trabajo de">Trabajo de</InputLabel>
            <Select
              value={this.state.answers['Trabajo de']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Trabajo de',
                id: 'Trabajo de',
              }}
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="SysAdmin / DevOps">SysAdmin / DevOps</MenuItem>
              <MenuItem value="HelpDesk">HelpDesk</MenuItem>
              <MenuItem value="Networking">Networking</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
              <MenuItem value="QA / Tester">QA / Tester</MenuItem>
              <MenuItem value="Architect">Architect</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Tecnologías que utilizás</FormLabel>
            <FormGroup>
              {Object.keys(tech).map(ts => tech[ts].map((t) => 
              <FormControlLabel
                key={`technology-${ts}-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers[ts].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name={ts}
                    value={t}
                  />
                }
                label={t}
              />
              ))}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Cantidad de empleados">Cantidad de empleados en la empresa</InputLabel>
            <Select
              value={this.state.answers['Cantidad de empleados']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Cantidad de empleados',
                id: 'Cantidad de empleados',
              }}
            >
              <MenuItem value="1-10">1-10</MenuItem>
              <MenuItem value="11-50">11-50</MenuItem>
              <MenuItem value="51-100">51-100</MenuItem>
              <MenuItem value="101-200">101-200</MenuItem>
              <MenuItem value="201-500">201-500</MenuItem>
              <MenuItem value="501-1000">201-500</MenuItem>
              <MenuItem value="1001-2000">1001-2000</MenuItem>
              <MenuItem value="2001-5000">2001-5000</MenuItem>
              <MenuItem value="5001-10000">5001-10000</MenuItem>
              <MenuItem value="10001+">10001+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Beneficios Extra</FormLabel>
            <FormGroup>
              {benefits.map((t) => 
              <FormControlLabel
                key={`benefit-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers['Beneficios Extra'].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name="Beneficios Extra"
                    value={t}
                  />
                }
                label={t}
              />
              )}
            </FormGroup>
          </FormControl>
          <Button variant="outlined" color="primary" onClick={this.calculateSalary}>
            Calcular sueldo
          </Button>
        </div>
        <div className="result-list">
          <div style={{width: 440 * ((this.state.changedSinceSubmitted ? 1 : 0) + this.state.results.length)}}>
            {this.state.changedSinceSubmitted && <Result data={this.state.answers} salary={{}} />}
            {this.state.results.map((r, k) => <Result key={k} data={r.answers} salary={r.salary} error={r.error} />).reverse()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
