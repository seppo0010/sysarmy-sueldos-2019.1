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

class App extends Component {
  state = {
    'Me identifico': '',
    'Tengo': '',
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
  };

  handleChange = event => {
    const key = event.target.name
    const val = event.target.value
    if (Array.isArray(this.state[key])) {
      const index = this.state[key].indexOf(val)
      if (index >= 0) {
        const arr = this.state[key].concat([])
        arr.splice(index, 1)
        this.setState({ [key]: arr });
      } else {
        this.setState({ [key]: this.state[key].concat([val]) });
      }
    } else {
      this.setState({ [key]: val });
    }
  };

  render() {
    return (
      <div className="App">
        <div>
          <FormControl component="fieldset" required className="form-element">
            <FormLabel component="legend">Me identifico</FormLabel>
            <RadioGroup
              aria-label="Me identifico"
              name="Me identifico"
              value={this.state['Me identifico']}
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
              value={this.state['Tengo']}
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
            <InputLabel htmlFor="Años de experiencia">Años de experiencia</InputLabel>
            <Select
              value={this.state['Años de experiencia']}
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
              value={this.state['Años en el puesto actual']}
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
              value={this.state['¿Cuánta?']}
              onChange={this.handleChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              min={0}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Nivel de estudios alcanzado">Nivel de estudios alcanzado</InputLabel>
            <Select
              value={this.state['Nivel de estudios alcanzado']}
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
              value={this.state['Estado']}
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
              value={this.state['Carrera']}
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
              value={this.state['Trabajo de']}
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
                    checked={this.state[ts].indexOf(t) >= 0}
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
              value={this.state['Cantidad de empleados']}
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
                    checked={this.state['Beneficios Extra'].indexOf(t) >= 0}
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
          <Button variant="outlined" color="primary">
            Calcular sueldo
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
