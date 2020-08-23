import React from 'react';

const TAGS = ['Black', 'Woman', 'Femme', 'LGBQ+', 'Transgender', 'Non-Binary', 'Indigenous', 'Immigrant', 'Disabled']

function TagList(props){

  function handleClick(e){
    e.preventDefault();
    const targ = e.target.text;
    console.log(targ);
  }

  return (
    <ul className='tagList'>
      {TAGS.map((text) => <li className='tag' key={text}><a href='' onClick={handleClick}>{text}</a></li>)}
    </ul>
  )
}

export default TagList;
