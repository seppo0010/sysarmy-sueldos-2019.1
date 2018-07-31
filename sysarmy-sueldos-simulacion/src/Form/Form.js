import React, { Component } from 'react';
import './Form.css'

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
import Spinner from '../Spinner/Spinner'

const PREDICT_URL = 'https://cors-anywhere.herokuapp.com/http://98.234.196.35.bc.googleusercontent.com:8180/predict'

class Form extends Component {
  constructor (props) {
    super (props)

    this.state = {
      answers: props.answers,
      results: props.results,
      isCalculating: false
    }

    this.tech = {
      'Tecnologías que utilizás': ['Linux', '*BSD', 'AIX', 'OpenStack', 'Solaris', 'HP-UX', 'VMWare', 'Docker / Containers', 'Azure', 'Amazon Web Services'],
      'Tecnologías que utilizás.1': ['HTML', 'CSS', 'Javascript', 'jQuery', 'Java', 'PHP', 'Python', '.NET', 'NodeJS', 'C#', 'Ruby', 'Perl', 'Go', 'Scala', 'VB*', 'C++', 'C', 'ABAP', 'Swift', 'Objective-C'],
      'Tecnologías que utilizás.3': ['Selenium', 'Visual Studio Coded UI', 'OpenQA', 'HP LoadRunner', 'Test Complete', 'Watir', 'Postman', 'RSpec', 'JMeter'],
      'Tecnologías que utilizás.4': ['Oracle', 'MSSQL', 'MySQL', 'MariaDB', 'PostgreSQL', 'SQL', 'Redis', 'MongoDB', 'Hadoop', 'Cassandra', 'Google bigQuery'],
    }

    this.benefits = [
        'Horarios flexibles',
        'WFH',
        'Laptop',
        'Aumento por inflación',
        'Capacitaciones y/o cursos',
        'Clases de idiomas',
        'Descuentos en gimnasios',
        'Snacks',
        'Bebidas',
        'Golosinas',
        'Abono de celular y/o Internet',
        'Comidas pagas',
        'Bonos por desempeño',
    ]
  }

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

    this.props.handleChange(key, val)
  };

  calculateSalary = async () => {
    this.setState({
      isCalculating: true
    })

    const answers = this.state.answers
    let results = this.state.results
    let formBody = [];

    for (let answer in answers) {
      let encodedKey = encodeURIComponent(answer);
      let encodedValue = encodeURIComponent(answers[answer]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const getPrediction = await fetch(PREDICT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })

    const getJsonPrediction = await getPrediction.json()
    results.push({
      answers: this.props.answers,
      salary: getJsonPrediction
    })

    

    this.setState({
      isCalculating: false
    })

    this.props.handleChange('results', results)
    window.scroll({
      top: 2500,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div className="form-main-container">
        <p>Complet&aacute; el formulario siguiente y obten&eacute; una estimaci&oacute;n del sueldo bruto que podr&iacute;as estar ganando.</p>
        <p>El sueldo se estima de acuerdo a varios modelos, el modelo "rfr2" es el que mejor resultados da.</p>
        <p>Si te interesa saber c&oacute;mo est&aacute;n armados, pod&eacute;s leer el paso a paso que no requiere mucho conocimento previo <a href="https://github.com/seppo0010/sysarmy-sueldos/blob/master/notebook/Sysarmy%20-%20Predicci%C3%B3n%20de%20sueldos.ipynb" target="_blank" rel="noopener noreferrer">aqu&iacute;</a>.</p>
        <p>Los modelos se armaron con datos recolectados en la <a href="https://sysarmy.wordpress.com/2018/03/05/resultados-de-la-encuesta-de-sueldos-2018-1/" target="_blank" rel="noopener noreferrer">encuesta de sysarmy</a> llevada a cabo durante los primeros meses de 2018.</p>
        <hr/>
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
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
        <div className="form-container">
          <FormControl className="form-element">
            <FormLabel component="legend">Tecnologías que utilizás</FormLabel>
            <FormGroup style={{height: '820px', 'flexDirection': 'column'}}>
              {Object.keys(this.tech).map(ts => this.tech[ts].map((t) => 
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
        <div className="form-container">
          <FormControl className="form-element">
            <FormLabel component="legend">Beneficios Extra</FormLabel>
            <FormGroup style={{height: '380px', 'flexDirection': 'column'}}>
              {this.benefits.map((t) => <div key={`benefit-${t}`}>
                <FormControlLabel
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
              </div>
              )}
            </FormGroup>
          </FormControl>
          <Button variant="outlined" color="primary" onClick={this.calculateSalary}>
            {this.state.isCalculating &&
              <Spinner />
            }
            {!this.state.isCalculating &&
              <span>Calcular sueldo</span>
            }
          </Button>
        </div>
      </div>
    )
  }
}

export default Form