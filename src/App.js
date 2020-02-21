import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingField: Array(9).fill(null),
      count: 0,
      reset: ''
    }

  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     playingField: props.appData.playingField
  //   }
  // }

  clickHandler = (event) => {
    let count = this.state.count;
    let dataId = event.target.getAttribute('data-id');
    let curentPlayingField = this.state.playingField;
    if (event.target.innerText === '' || curentPlayingField[dataId] === null) {
      if (count % 2 === 0) {
        // event.target.innerText = 'X';  
        curentPlayingField[dataId] = 'X';
      } else {
        // event.target.innerText = 'O';
        curentPlayingField[dataId] = 'O';
      }
      this.setState({ count: count + 1 });
      this.winner();
    } else {
      alert('field is occupied')
    }
  }

  winner = () => {
    let move = (this.state.count % 2 === 0) ? 'X' : 'O';
    console.log(move)
    if (this.state.count === 8) {
      this.setState({ reset: 'reset' })
    }
  }
  
  resetApp = () => {
    this.setState({ playingField: Array(9).fill(null) })
    this.setState({ count: 0})
  }

  render() {
    let appData = this.props.appData;
    return (
      <div className="tic-tac-toe">
        <h1>{appData.title}</h1>
        <p>{appData.description}</p>
        <div className="playing-field">
          {this.state.playingField.map((obect, i) => {
            return (
              <div key={'data-id' + i} data-id={i} className="playing-field__square" onClick={this.clickHandler}>{obect}</div>
            )
          })}
        </div>
        <div className="reset" onClick={this.resetApp}>{this.state.reset}</div>
      </div>
    )
  }

}

export default App;
