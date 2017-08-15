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
      word: ""
    }

    this.onSelectDie = this.onSelectDie.bind(this);
    this.selectionValidator = this.selectionValidator.bind(this);
    this.onDieMouseOver = this.onDieMouseOver.bind(this);
    this.handleReturnPress = this.handleReturnPress.bind(this);
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
    if (this.selectionValidator(id) && this.props.time !== 0) {
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

      if (this.props.time !== 0) {
        this.setState({ word: this.state.word +  targetLetter })
      }
    }
  }

  onDieMouseOver(id) {
    if (this.selectionValidator(id) && this.state.time !== 0) {
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
          ( xDiff === 1 && yDiff === 1 )
        )
      )
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
    if (event.which === 13 && this.state.word !== "" && this.props.time !== 0) { // if the 'return' key is pressed
      this.clearState();
      this.props.onReturnPress(this.state.word);
    }
  }

  onDieClick() {
    this.setState({  })
  }

  render() {
    let flattenedBoard = [].concat.apply([], this.props.board);
    let selectedIdsProp = this.state.selectedIds
    let currentIdProp = this.state.currentId
    let wordProp = this.state.word

    if (this.props.time === 0) {  // when the game ends, do the following:
      flattenedBoard.forEach( (die) => {
        die.letter = " "
      })

      flattenedBoard[5].letter = "G";
      flattenedBoard[6].letter = "A";
      flattenedBoard[7].letter = "M";
      flattenedBoard[8].letter = "E";

      flattenedBoard[16].letter = "O";
      flattenedBoard[17].letter = "V";
      flattenedBoard[18].letter = "E";
      flattenedBoard[19].letter = "R";

      let gameOverSelectedIds = []

      let flattenedBoardIds = flattenedBoard.forEach( (die) => {
        if (die.letter !== " ") {
          gameOverSelectedIds.push(die.id)
        }
      })


      // for (let i = 1; i <= 25; i++) {
      //   gameOverSelectedIds.push(i)
      // }
      // gameOverSelectedIds.push(...flattenedBoardIds)

      selectedIdsProp = gameOverSelectedIds

      currentIdProp = null
      wordProp = "Checking Words..."

      if (this.props.spellCheckComplete) {
        wordProp = "Nice Work! :D"
      }
    }

    let dice = flattenedBoard.map( (dieData, index) => {
      return(
        <Die
          key={index}
          id={dieData.id}
          dieData={dieData}
          onSelectDie={this.onSelectDie}
          selectedIds={selectedIdsProp}
          currentId={currentIdProp}
          onDieMouseOver={this.onDieMouseOver}
          mouseOverData={this.state.mouseOverData}
        />
      );
    });

    return(
      <div>
        <div className="board" onKeyPress={this.handleReturnPress} tabIndex="0">
          {dice}
        </div>
        <h3 className="current-word">
          {wordProp}
        </h3>
      </div>
    );
  }
}

export default Board
