import React, { Component } from 'react';
import data from '../constants/data'
import Board from './Board'
import WordList from '../components/WordList'

//datamuse (no token required)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.initializeBoard(),
      wordList: [],
      wordListIndex: 0,
      invalidWords: [],
      timer: 15
    }

    this.initializeBoard = this.initializeBoard.bind(this);
    this.onReturnPress = this.onReturnPress.bind(this);
  }

  startTimer() {
    let timerFunction = setInterval( () => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000)

    let clock = setTimeout( () => {
      clearInterval(timerFunction);
      console.log("Hello from inside the stop timer conditional");
    }, 1000 * this.state.timer)

    return timerFunction
  }

  componentDidMount() {
    this.startTimer();
  }

  onReturnPress(word) {
    this.setState({ wordList: this.state.wordList.concat(word) })
  }

  initializeBoard() {
    let grid = [];
    for(let i = 0; i < 5; i++) {
      let row = [];
      for(let j = 0; j< 5; j++) {
        let shuffledDiceArray = this.shuffle(this.props.data);
        let dieData = shuffledDiceArray.pop();
        let die = {
          id: dieData.id,
          letter: this.randomLetter(dieData.sides)
        }
        row.push(die);
      }
      grid.push(row);
    }
    return grid;
  }

  randomLetter(dieArray) {
    let randomSide = Math.floor(Math.random() * dieArray.length);
    return dieArray[randomSide];
  }

  shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  }

  render() {
    if (this.state.timer === 0) {
      if (this.state.wordListIndex < this.state.wordList.length) {
        fetch(`/api`, {
          method: 'POST',
          body: this.state.wordList[this.state.wordListIndex]
        })
        .then(response => {
          debugger;
          if (this.state.wordList[this.state.wordListIndex]) {
            setTimeout ( () => {
              this.state.wordList
            }, 500)
          }
        })
        this.setState({ wordListIndex: this.state.wordListIndex + 1 })
      }
    }

    return (
      <div>
        <div className="row">
          <div className="title small-4 columns">
            <h1>Boggle</h1>
          </div>

          <div className="timer small-8 columns">
            <h3>{this.state.timer}</h3>
          </div>
        </div>

        <div className="layout row">
          <div className="small-8 columns">
            <Board
              board={this.state.board}
              time={this.state.timer}
              onReturnPress={this.onReturnPress}
            />
          </div>

          <div className="small-4 columns">
            <h4>WordList</h4>
            <WordList
              wordArray={this.state.wordList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
