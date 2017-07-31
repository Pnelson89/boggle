import React from 'react'
import Die from './Die'

const Row = (props) => {
  let rowDice = props.rowData.map( (dieData) => {
    return(
      <Die
        key={dieData.id}
        // id={props.dice[idIncrementer + 5 * props.id].id
        id={dieData.id}
        dieData={dieData}
        onSelectDie={props.onSelectDie}
        selectedIds={props.selectedIds}
        currentId={props.currentId}
        onDieMouseOver={props.onDieMouseOver}
        mouseOverData={props.mouseOverData}
      />
    )
  })

  return(
    <div className="">
      {rowDice}
    </div>
  )
}

export default Row
