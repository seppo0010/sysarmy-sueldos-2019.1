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

// const PREDICT_URL = 'https://cors-anywhere.herokuapp.com/http://98.234.196.35.bc.googleusercontent.com:8180/predict'
const PREDICT_URL = 'http://localhost:5000/predict'

const specialization = ['No', 'Sí, de forma particular', 'Sí, los pagó un empleador']
const events = ['Nerdearla', 'EkoParty', 'NodeConfAr']
const tech = {
  'Plataformas': ['Linux', '*BSD', 'AIX', 'OpenStack', 'Solaris', 'HP-UX', 'VMWare', 'Docker / Containers', 'Azure', 'Amazon Web Services'],
  'Lenguajes de programación': ['HTML', 'CSS', 'Javascript', 'jQuery', 'Java', 'PHP', 'Python', '.NET', 'NodeJS', 'C#', 'Ruby', 'Perl', 'Go', 'Scala', 'VB*', 'C++', 'C', 'ABAP', 'Swift', 'Objective-C'],
  'Bases de datos': ['Oracle', 'MSSQL', 'MySQL', 'MariaDB', 'PostgreSQL', 'SQL', 'Redis', 'MongoDB', 'Hadoop', 'Cassandra', 'Google bigQuery'],
  'IDEs': ['Android Studio', 'Atom', 'Eclipse', 'IntelliJ', 'NetBeans', 'Notepad++', 'PyCharm', 'Sublime Text', 'Vi', 'Vim', 'Visual Studio'],
}

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
        <div><label>Trabajo en: </label><strong>{this.props.data['Dónde estás trabajando']}</strong></div>
        <div><label>Años de experiencia: </label><strong>{this.props.data['Años de experiencia']}</strong></div>
        <div><label>Años en la empresa actual: </label><strong>{this.props.data['Años en la empresa actual']}</strong></div>
        <div><label>Nivel de estudios alcanzado: </label><strong>{this.props.data['Nivel de estudios alcanzado']}</strong></div>
        <div><label>Estado: </label><strong>{this.props.data['Estado']}</strong></div>
        <div><label>Carrera: </label><strong>{this.props.data['Carrera']}</strong></div>
        <div><label>Universidad: </label><strong>{this.props.data['Universidad']}</strong></div>
        <div><label>Realizaste cursos de especialización: </label><strong>{this.props.data['Realizaste cursos de especialización'].join(', ')}</strong></div>
        <div><label>Cantidad de empleados: </label><strong>{this.props.data['Cantidad de empleados']}</strong></div>
        <div><label>Actividad principal: </label><strong>{this.props.data['Actividad principal']}</strong></div>
        <div><label>¿Gente a cargo?: </label><strong>{this.props.data['¿Gente a cargo?']}</strong></div>
        <div><label>¿Contribuís a proyectos open source?: </label><strong>{this.props.data['¿Contribuís a proyectos open source?']}</strong></div>
        <div><label>¿Programás como hobbie?: </label><strong>{this.props.data['¿Programás como hobbie?']}</strong></div>
        <div><label>Trabajo de: </label><strong>{this.props.data['Trabajo de']}</strong></div>
        <div><label>¿Qué SO usás en tu laptop/PC para trabajar?: </label><strong>{this.props.data['¿Qué SO usás en tu laptop/PC para trabajar?']}</strong></div>
        <div><label>¿Y en tu celular?: </label><strong>{this.props.data['¿Y en tu celular?']}</strong></div>
        <div><label>Tipo de contrato: </label><strong>{this.props.data['Tipo de contrato']}</strong></div>
        <div><label>¿Sufriste o presenciaste situaciones de violencia laboral?: </label><strong>{this.props.data['¿Sufriste o presenciaste situaciones de violencia laboral?']}</strong></div>
        <div><label>Orientación sexual: </label><strong>{this.props.data['Orientación sexual']}</strong></div>
        <div><label>¿Tenés algún tipo de discapacidad?: </label><strong>{this.props.data['¿Tenés algún tipo de discapacidad?']}</strong></div>
        <div><label>¿A qué eventos de tecnología asististe en el último año?: </label><strong>{this.props.data['¿A qué eventos de tecnología asististe en el último año?'].join(', ')}</strong></div>
        <div><label>Plataformas: </label><strong>{this.props.data['Plataformas'].join(', ')}</strong></div>
        <div><label>Lenguajes de programación: </label><strong>{this.props.data['Lenguajes de programación'].join(', ')}</strong></div>
        <div><label>Frameworks, herramientas y librerías: </label><strong>{this.props.data['Frameworks, herramientas y librerías'].join(', ')}</strong></div>
        <div><label>Bases de datos: </label><strong>{this.props.data['Bases de datos'].join(', ')}</strong></div>
        <div><label>IDEs: </label><strong>{this.props.data['IDEs'].join(', ')}</strong></div>
        <div><label>Sueldo estimado: </label><strong>{this.props.salary && this.props.salary.xgb && formatter.format(this.props.salary.xgb)}</strong></div>
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
      'Tengo': 18,
      'Dónde estás trabajando': 'Ciudad Autónoma de Buenos Aires',
      'Años de experiencia': 0,
      'Años en la empresa actual': 0,
      'Nivel de estudios alcanzado': '',
      'Estado': '',
      'Cantidad de empleados': '',
      'Actividad principal': '',
      '¿Gente a cargo?': 0,
      '¿Contribuís a proyectos open source?': '',
      '¿Programás como hobbie?': '',
      'Trabajo de': '',
      '¿Qué SO usás en tu laptop/PC para trabajar?': '',
      '¿Y en tu celular?': '',
      'Realizaste cursos de especialización': [],
      'Plataformas': [],
      'Lenguajes de programación': [],
      'Frameworks, herramientas y librerías': [],
      'Bases de datos': [],
      'IDEs': [],
      '¿A qué eventos de tecnología asististe en el último año?': [],
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
        this.setState({ answers: Object.assign({}, this.state.answers, { [key]: this.state.answers[key].concat([val]).sort() }) });
      }
    } else {
      this.setState({ answers: Object.assign({}, this.state.answers, { [key]: val }) });
    }
  };

  enc = val => {
    if (Array.isArray(val)) {
      val = val.join(', ')
    }
    return encodeURIComponent(val)
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
    request.send(Object.keys(this.state.answers).map(key => `${encodeURIComponent(key)}=${this.enc(this.state.answers[key])}`).join('&'));
  }

  render() {
    return (
      <div className="App">
        <p>Complet&aacute; el formulario siguiente y obten&eacute; una estimaci&oacute;n del sueldo bruto que podr&iacute;as estar ganando.</p>
        <p>El sueldo se estima de acuerdo a un modelo armado de datos recolectados en la encuesta an&oacute;nima.</p>
        <p>Si te interesa saber c&oacute;mo est&aacute;n armados, pod&eacute;s leer el paso a paso <a href="https://github.com/seppo0010/sysarmy-sueldos/blob/master/notebook/Sysarmy%20-%20Predicci%C3%B3n%20de%20sueldos%20-%202019.1.ipynb" target="_blank" rel="noopener noreferrer">aqu&iacute;</a>.</p>
        <p>Los modelos se armaron con datos recolectados en la <a href="https://sysarmy.wordpress.com/2019/02/22/resultados-de-la-encuesta-de-sueldos-2019-1/" target="_blank" rel="noopener noreferrer">encuesta de sysarmy</a> llevada a cabo durante los primeros meses de 2019.</p>
        <hr/>
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
              <MenuItem value="1">1 año</MenuItem>
              {Array.from(Array(100).keys()).slice(2).map((i) => <MenuItem value={i}>{i} años</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Dónde estás trabajando">Dónde estás trabajando</InputLabel>
            <Select
              value={this.state.answers['Dónde estás trabajando']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Dónde estás trabajando',
                id: 'Dónde estás trabajando',
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
              <MenuItem value={0}>Menos de un año</MenuItem>
              {Array.from(Array(100).keys()).slice(1).map((i) => <MenuItem value={i}>{i} años</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Años en la empresa actual">Años en la empresa actual</InputLabel>
            <Select
              value={this.state.answers['Años en la empresa actual']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Años en la empresa actual',
                id: 'Años en la empresa actual',
              }}
            >
              <MenuItem value={0}>Menos de un año</MenuItem>
              {Array.from(Array(100).keys()).slice(1).map((i) => <MenuItem value={i}>{i} años</MenuItem>)}
            </Select>
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
            <FormLabel component="legend">Carrera</FormLabel>
            <Select
              aria-label="Carrera"
              name="Carrera"
              value={this.state.answers['Carrera']}
              onChange={this.handleChange}
            >
              <MenuItem value="Ingeniería en Informática">Ingeniería en Informática</MenuItem>
              <MenuItem value="Ingeniería en Sistemas de Información">Ingeniería en Sistemas de Información</MenuItem>
              <MenuItem value="Ingeniería en Sistemas">Ingeniería en Sistemas</MenuItem>
              <MenuItem value="Analista de Sistemas">Analista de Sistemas</MenuItem>
              <MenuItem value="Licenciatura en Ciencias de la Computación">Licenciatura en Ciencias de la Computación</MenuItem>
              <MenuItem value="Licenciatura en Sistemas de Información">Licenciatura en Sistemas de Información</MenuItem>
              <MenuItem value="Licenciatura en Informática">Licenciatura en Informática</MenuItem>
              <MenuItem value="Licenciatura en Sistemas">Licenciatura en Sistemas</MenuItem>
              <MenuItem value="Ingeniería en Electrónica">Ingeniería en Electrónica</MenuItem>
              <MenuItem value="Sistemas">Sistemas</MenuItem>
              <MenuItem value="Tecnicatura Superior en Programación">Tecnicatura Superior en Programación</MenuItem>
              <MenuItem value="Ingeniería en Computación">Ingeniería en Computación</MenuItem>
              <MenuItem value="Licenciatura en Análisis de Sistemas">Licenciatura en Análisis de Sistemas</MenuItem>
              <MenuItem value="Diseño Gráfico">Diseño Gráfico</MenuItem>
              <MenuItem value="Ingeniería en Telecomunicaciones">Ingeniería en Telecomunicaciones</MenuItem>
              <MenuItem value="Tecnicatura en Programación">Tecnicatura en Programación</MenuItem>
              <MenuItem value="Ingeniería">Ingeniería</MenuItem>
              <MenuItem value="Programación">Programación</MenuItem>
              <MenuItem value="Informática">Informática</MenuItem>
              <MenuItem value="Ingeniería en Industrial">Ingeniería en Industrial</MenuItem>
              <MenuItem value="">Otra</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Universidad</FormLabel>
            <Select
              aria-label="Universidad"
              name="Universidad"
              value={this.state.answers['Universidad']}
              onChange={this.handleChange}
            >
              <MenuItem value="UTN">UTN</MenuItem>
              <MenuItem value="UBA">UBA</MenuItem>
              <MenuItem value="UADE">UADE</MenuItem>
              <MenuItem value="UNLaM">UNLaM</MenuItem>
              <MenuItem value="UAI">UAI</MenuItem>
              <MenuItem value="UNLP">UNLP</MenuItem>
              <MenuItem value="UP">UP</MenuItem>
              <MenuItem value="CAECE">CAECE</MenuItem>
              <MenuItem value="ORT">ORT</MenuItem>
              <MenuItem value="UNICEN">UNICEN</MenuItem>
              <MenuItem value="DaVinci">DaVinci</MenuItem>
              <MenuItem value="UNC">UNC</MenuItem>
              <MenuItem value="Siglo 21">Siglo 21</MenuItem>
              <MenuItem value="UM">UM</MenuItem>
              <MenuItem value="UNL">UNL</MenuItem>
              <MenuItem value="UNS">UNS</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="UNQ">UNQ</MenuItem>
              <MenuItem value="ITBA">ITBA</MenuItem>
              <MenuItem value="ISTEA">ISTEA</MenuItem>
              <MenuItem value="">Otro</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Realizaste cursos de especialización</FormLabel>
            <FormGroup style={{'flex-direction': 'column'}}>
              {specialization.map((t) =>
              <FormControlLabel
                key={`specialization-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers['Realizaste cursos de especialización'].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name="Realizaste cursos de especialización"
                    value={t}
                  />
                }
                label={t}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Cantidad de empleados">Cantidad de empleados en tu trabajo actual</InputLabel>
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
              <MenuItem value="501-1000">501-1000</MenuItem>
              <MenuItem value="1001-2000">1001-2000</MenuItem>
              <MenuItem value="2001-5000">2001-5000</MenuItem>
              <MenuItem value="5001-10000">5001-10000</MenuItem>
              <MenuItem value="10001+">10001+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Actividad principal">Actividad principal</InputLabel>
            <Select
              value={this.state.answers['Actividad principal']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Actividad principal',
                id: 'Actividad principal',
              }}
            >
              <MenuItem value="Servicios / Consultoría de Software / Digital">Servicios / Consultoría de Software / Digital</MenuItem>
              <MenuItem value="Producto basado en Software">Producto basado en Software</MenuItem>
              <MenuItem value="Otras industrias">Otras industrias</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <TextField
              id="¿Gente a cargo?"
              name="¿Gente a cargo?"
              label="¿Cuánta gente a cargo? (si no tenés, poné 0)"
              value={this.state.answers['¿Gente a cargo?']}
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
            <FormLabel component="legend">¿Contribuís a proyectos open source?</FormLabel>
            <Select
              aria-label="¿Contribuís a proyectos open source?"
              name="¿Contribuís a proyectos open source?"
              value={this.state.answers['¿Contribuís a proyectos open source?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿Programás como hobbie?</FormLabel>
            <Select
              aria-label="¿Programás como hobbie?"
              name="¿Programás como hobbie?"
              value={this.state.answers['¿Programás como hobbie?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
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
            <FormLabel component="legend">¿Qué SO usás en tu laptop/PC para trabajar?</FormLabel>
            <Select
              aria-label="¿Qué SO usás en tu laptop/PC para trabajar?"
              name="¿Qué SO usás en tu laptop/PC para trabajar?"
              value={this.state.answers['¿Qué SO usás en tu laptop/PC para trabajar?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Windows">Windows</MenuItem>
              <MenuItem value="Linux">Linux</MenuItem>
              <MenuItem value="Mac OS X">Mac OS X</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿Y en tu celular?</FormLabel>
            <Select
              aria-label="¿Y en tu celular?"
              name="¿Y en tu celular?"
              value={this.state.answers['¿Y en tu celular?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Android">Android</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
              <MenuItem value="Windows">Windows</MenuItem>
              <MenuItem value="No tengo celular / no es Smartphone">No tengo celular / no es Smartphone</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Tipo de contrato</FormLabel>
            <Select
              aria-label="Tipo de contrato"
              name="Tipo de contrato"
              value={this.state.answers['Tipo de contrato']}
              onChange={this.handleChange}
            >
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
              <MenuItem value="Tercerizado (trabajo a través de consultora o agencia)">Tercerizado (trabajo a través de consultora o agencia)</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
              <MenuItem value="Remoto (empresa de otro país)">Remoto (empresa de otro país)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿Sufriste o presenciaste situaciones de violencia laboral?</FormLabel>
            <Select
              aria-label="¿Sufriste o presenciaste situaciones de violencia laboral?"
              name="¿Sufriste o presenciaste situaciones de violencia laboral?"
              value={this.state.answers['¿Sufriste o presenciaste situaciones de violencia laboral?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Jamás">Jamás</MenuItem>
              <MenuItem value="En un trabajo anterior">En un trabajo anterior</MenuItem>
              <MenuItem value="En mi trabajo actual">En mi trabajo actual</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Orientación sexual</FormLabel>
            <Select
              aria-label="Orientación sexual"
              name="Orientación sexual"
              value={this.state.answers['Orientación sexual']}
              onChange={this.handleChange}
            >
              <MenuItem value="Heterosexual">Heterosexual</MenuItem>
              <MenuItem value="Homosexual">Homosexual</MenuItem>
              <MenuItem value="Bisexual o queer">Bisexual o queer</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿Tenés algún tipo de discapacidad?</FormLabel>
            <Select
              aria-label="¿Tenés algún tipo de discapacidad?"
              name="¿Tenés algún tipo de discapacidad?"
              value={this.state.answers['¿Tenés algún tipo de discapacidad?']}
              onChange={this.handleChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Auditiva">Auditiva</MenuItem>
              <MenuItem value="Motriz">Motriz</MenuItem>
              <MenuItem value="Mental">Mental</MenuItem>
             }<MenuItem value="Visceral">Visceral</MenuItem>
              <MenuItem value="Vocal">Vocal</MenuItem>
              <MenuItem value="Otra">Otra</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿A qué eventos de tecnología asististe en el último año?</FormLabel>
            <FormGroup style={{'flex-direction': 'column'}}>
              {events.map((t) =>
              <FormControlLabel
                key={`events-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers['¿A qué eventos de tecnología asististe en el último año?'].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name="¿A qué eventos de tecnología asististe en el último año?"
                    value={t}
                  />
                }
                label={t}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Tecnologías que utilizás</FormLabel>
            <FormGroup style={{height: '820px', 'flex-direction': 'column'}}>
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
