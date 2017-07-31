import React from 'react'
// import Row from './Row'
import Die from '../components/Die'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      mouseOverData: {id: -1, isValid: false},
      currentId: null,
      word: "",
      timer: 15
    }

    this.onSelectDie = this.onSelectDie.bind(this);
    this.selectionValidator = this.selectionValidator.bind(this);
    this.onDieMouseOver = this.onDieMouseOver.bind(this);
    this.handleReturnPress = this.handleReturnPress.bind(this);
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

  // stopTimer(startTimer) {
  //   clearInterval(startTimer);
  // }

  componentDidMount() {
    this.startTimer();
  }

  gridIndexOf(grid, value) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === value) {
          return { x:i, y:j };
        }
      }
    }
    return { x:null, y:null };
  }

  gridIncludes(grid, value) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === value) {
          return true;
        }
      }
    }
    console.log(`GridIncludes Returned False`)
    return false;
  }

  onSelectDie(id) {
    let selectedIds = this.state.selectedIds;
    if (this.selectionValidator(id)) {
      let newSelectedIds = selectedIds.concat(id);
      this.setState({ selectedIds: newSelectedIds });
      this.setState({ currentId: id })

      let boardIds = this.props.board.map( (row) => {
        return row.map( (die) => {
          return die.id;
        })
      })

      let dieIndex = this.gridIndexOf(boardIds, id)
      let targetLetter = this.props.board[dieIndex.x][dieIndex.y].letter
      this.setState({ word: this.state.word +  targetLetter })
    }
  }

  onDieMouseOver(id) {
    if (this.selectionValidator(id)) {
      let mouseOverObj = { id: id, isValid: true }
      this.setState({ mouseOverData: mouseOverObj })
    } else {
      let mouseOverObj = { id: id, isValid: false }
      this.setState({ mouseOverData: mouseOverObj })
    }
  }

  selectionValidator(newId) {
    let board = this.props.board;
    let selectedIds = this.state.selectedIds;
    let currentId = selectedIds[selectedIds.length - 1];
    let boardIds = board.map( (row) => {
      return row.map( (die) => {
        return die.id;
      })
    })
    let newIndex = this.gridIndexOf(boardIds, newId);
    let currentIndex = this.gridIndexOf(boardIds, currentId);

    let xDiff = Math.abs(newIndex.x - currentIndex.x);
    let yDiff = Math.abs(newIndex.y - currentIndex.y);
    if (
      selectedIds.length < 1 ||
      ( ( !selectedIds.includes(newId) ) &&
      ( ( xDiff === 1 && yDiff === 0 ) ||
      ( xDiff === 0 && yDiff === 1 ) ||
      ( xDiff === 1 && yDiff === 1) ) )
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearState() {
    this.setState({ selectedIds: [] })
    this.setState({ mouseOverData: {id: -1, isValid: false} })
    this.setState({ currentId: null })
    this.setState({ word: "" })
  }

  handleReturnPress(event) {
    if (event.which === 13 && this.state.word !== "") { // if the 'return' key is pressed
      this.clearState();
      this.props.onReturnPress(this.state.word);
    }
  }

  onDieClick() {
    this.setState({  })
  }

  render() {
    // console.log(`id: ${this.state.mouseOverData.id}, isValid: ${this.state.mouseOverData.isValid}`)
    let idIncrementer = 0;
    let flattenedBoard = [].concat.apply([], this.props.board);
    let dice = flattenedBoard.map( (dieData, index) => {
      return(
        <Die
          key={index}
          id={dieData.id}
          dieData={dieData}
          onSelectDie={this.onSelectDie}
          selectedIds={this.state.selectedIds}
          currentId={this.state.currentId}
          onDieMouseOver={this.onDieMouseOver}
          mouseOverData={this.state.mouseOverData}
        />
      );
    });

    return(
      <div>
        <div className="timer">
          <h3>{this.state.timer}</h3>
        </div>
        <div className="board" onKeyPress={this.handleReturnPress} tabIndex="0">
          {dice}
        </div>
        <h3 className="current-word">
          {this.state.word}
        </h3>
      </div>
    );
  }
}

export default Board
