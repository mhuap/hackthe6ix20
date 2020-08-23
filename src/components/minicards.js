import React from 'react';



function CardList(props){
  return (
    <ul className='cardList'>
      {props.numbers.map((num) => <MiniCard key={num} i={num}/>)}
    </ul>
  )
}

function MiniCard(props) {
  function handleClick(e){
    e.preventDefault();
    console.log(props.i);
  }

  return (
    <li>
      <a onClick={handleClick}>
        <img alt='filler' src={"https://picsum.photos/300/200?random=" + props.i} />
        <div>
          Item #{props.i} Name Goes Here
        </div>
      </a>
    </li>
  )
}

export default CardList;
