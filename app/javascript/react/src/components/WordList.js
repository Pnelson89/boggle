import React from 'react';

const WordList = (props) => {
  let words = props.wordArray.map( (word, index) => {
    return(
      <li key={index}>
        {word}
      </li>
    )
  })

  return(
    <ul>
      {words}
    </ul>
  )
}

export default WordList;
