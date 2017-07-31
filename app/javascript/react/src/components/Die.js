import React from 'react'

const Die = (props) => {
  let handleDieSelect = () => {
    props.onSelectDie(props.id);
  }

  let handleDieMouseOver = () => {
    props.onDieMouseOver(props.id);
  }

  let className = "die";
  if (props.selectedIds.includes(props.id)) {
    className += " selected";
  }

  if (props.mouseOverData.id === props.id) {
    if (props.mouseOverData.isValid) {
      className += " mouseover-valid";
    } else {
      className += " mouseover-invalid";
    }
  }

  if (props.currentId === props.id) {
    className += " current";
  }

  let selectNum = "";
  // if (props.selectedIds.indexOf(props.id) >= 0) {
  //   selectNum = props.selectedIds.indexOf(props.id) + 1;
  // }

  return(
    <div className={className} onClick={handleDieSelect} onMouseOver={handleDieMouseOver}>
      {`${props.dieData.letter}`}<sup>{selectNum}</sup>
    </div>
  )
}

export default Die
