import React, { Component } from 'react';
import data from '../constants/data'
import styles from '../stylesheets/index.css'
import Board from './Board'
import WordList from '../components/WordList'

//datamuse (no token required)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.initializeBoard(),
      wordList: []
    }

    this.initializeBoard = this.initializeBoard.bind(this);
    this.onReturnPress = this.onReturnPress.bind(this);
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
    console.log(this.state.wordList)
    return (
      <div>
        <h1>Boggle</h1>
        <div id="layout row">
          <div className="small-8 medium-2 large-1 columns">
            <Board
              board={this.state.board}
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
