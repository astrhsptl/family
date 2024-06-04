'use client';

import '../styles/checkbox.css';

type DefaultCheckboxProps = {} & JSX.IntrinsicElements['input'];

export const DefaultCheckbox = (props: DefaultCheckboxProps) => {
  return (
    <div className='checkbox-wrapper-13'>
      <input id='c1-13' type='checkbox' {...props} />
    </div>
  );
};
