import React, { Component } from 'react';
import Result from '../Result/Result'

class ResultList extends Component {
  constructor (props) {
    super (props)

    this.state = {
      renderResult: false
    }
  }

  render() {
    return (
      <div className="result-list">
        <div>
          {this.props.results.length > 0 &&
            <React.Fragment>
              {this.props.results.map((r, k) => {
                console.log(123, r.answers, r.salary)
                return(
                  <Result key={k} data={r.answers} salary={r.salary} error={r.error} />
                )
              }).reverse()}
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

export default ResultList