import React from 'react';

import './Button.scss';

const Button = ({ name, clickFunction }: { name: string; clickFunction: Function }) => {
  return (
    <button className='button' onClick={() => clickFunction()}>
      {name}
    </button>
  );
};

export default Button;
