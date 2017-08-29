import React from 'react';

const WordList = (props) => {
  let words = props.wordArray.map( (word, index) => {
    let classText = ""
    if (props.invalidWordIds.includes(index)) {
      classText += "invalid-word"
    }

    if (word.match(/TOTAL/)) {
      classText += " total-points"
    }

    return(
      <li key={index} className={classText}>
        {word}
      </li>
    )
  })

  return(
    <ul className="word-list">
      {words}
    </ul>
  )
}

export default WordList;
