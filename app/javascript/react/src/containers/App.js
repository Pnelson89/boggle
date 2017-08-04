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
      invalidWordIds: [],
      timer: 11,
      points: 0,
      spellCheckComplete: false
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
      this.endGameTimer();
      console.log("Hello from inside the stop timer conditional");
    }, 1000 * this.state.timer)

    return timerFunction
  }

  endGameTimer() {
    let wordListIndex = this.state.wordList.length

    let delay = setInterval( () => {
      wordListIndex--;
      console.log(`wordListIndex: ${wordListIndex}`)
      wordValidator(wordListIndex);
    }, 1000)

    let clock = setTimeout( () => {
      clearInterval(delay);
      console.log("Hello from after finishing our checks")
    }, 1000 * wordListIndex)

    // if (this.state.wordListIndex < this.state.wordList.length) {
    //   console.log(`current word: ${this.state.wordList[this.state.wordListIndex]}`)
    //   fetch(`/dictionary?key=${this.state.wordList[this.state.wordListIndex]}`)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(body => {
    //     setTimeout ( () => {
    //       let oldInvalidWordIds = this.state.invalidWordIds
    //       let newInvalidWordIds = oldInvalidWordIds
    //
    //       if (!body.isValid) {
    //         let wordIndex = this.state.wordListIndex
    //         newInvalidWordIds = newInvalidWordIds.concat(wordIndex)
    //
    //         this.setState({
    //           invalidWordIds: newInvalidWordIds,
    //           wordListIndex: this.state.wordListIndex + 1
    //         })
    //       } else {
    //
    //         let currentWord = this.state.wordList[this.state.wordListIndex]
    //         let pointsThisWord = (this.pointDictionary(currentWord.length))
    //
    //         let newWordList = this.state.wordList.filter( word => word !== currentWord )
    //         newWordList.splice(this.state.wordListIndex, 0, `${currentWord}:\t${pointsThisWord}pt(s)`)
    //         this.setState({
    //           points: this.state.points + pointsThisWord,
    //           wordList: newWordList,
    //           wordListIndex: this.state.wordListIndex + 1
    //         })
    //       }
    //     }, 1000)
    //     return body
    //   })
    // } else if (this.state.wordListIndex === this.state.wordList.length) {
    //   this.setState({
    //     wordList: this.state.wordList.concat(`TOTAL: ${this.state.points}pt(s)`),
    //     wordListIndex: this.state.wordListIndex + 2,
    //     spellCheckComplete: true
    //   })
    // }
  }

  componentDidMount() {
    this.startTimer();
  }

  // componentDidUpdate() {
  // }

  pointDictionary(wordLength) {
    if (wordLength <= 2) {return 0}
    else if (3 <= wordLength && wordLength <= 4) {return 1}
    else if (wordLength <= 5) {return 2}
    else if (wordLength <= 6) {return 3}
    else if (wordLength <= 7) {return 5}
    else {return 11}
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
    let spellCheckComplete = false
    if (this.state.wordListIndex > this.state.wordList.length) {
      spellCheckComplete = true
    }

    return (
      <div>
        <div className="row">
          <div className="title small-4 columns">
            <h1>Blorgle</h1>
          </div>

          <div className="small-8 columns">
            <h3 className="timer">{`${Math.floor(this.state.timer / 60)}:${Math.floor((this.state.timer % 60)/10)}${((this.state.timer % 60)%10)}`}</h3>
          </div>
        </div>

        <div className="layout row">
          <div className="small-6 columns">
            <Board
              board={this.state.board}
              time={this.state.timer}
              onReturnPress={this.onReturnPress}
              spellCheckComplete={this.state.spellCheckComplete}
            />
          </div>

          <div className="small-5 columns">
            <h4 className="word-list">WordList</h4>
            <WordList
              wordArray={this.state.wordList}
              invalidWordIds={this.state.invalidWordIds}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
