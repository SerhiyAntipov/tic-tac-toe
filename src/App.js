import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingField: Array(9).fill(null),
      count: 0,
      reset: '',
      winner: ''
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
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
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      if (this.state.playingField[line[0]] === move &&
        this.state.playingField[line[1]] === move &&
        this.state.playingField[line[2]] === move
      ) {
        let winner = <div className="winner">{move} Winner</div>;
        this.setState({ winner: winner });

        let reset = <div className="reset" onClick={this.resetApp}>Reset</div>
        this.setState({ reset: reset })

        let field = document.querySelectorAll('.playing-field__square');
        field[line[0]].classList.add("bg-red");
        field[line[1]].classList.add("bg-red");
        field[line[2]].classList.add("bg-red");

        // setTimeout(() => {
        //   this.resetApp()
        // }, 5000)
      }
    }

    if (this.state.count === 8) {
      let reset = <div className="reset" onClick={this.resetApp}>Reset</div>
      this.setState({ reset: reset })
    }
  }

  resetApp = () => {
    this.setState({ playingField: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState({ reset: '' });
    this.setState({ winner: '' });
    let redField = document.querySelectorAll('.bg-red');
    for (let i = 0; i < redField.length; i++) {
      redField[i].classList.remove("bg-red");
    }
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
        {this.state.winner}
        {this.state.reset}
      </div>
    )
  }
}

export default App;
