import React from 'react';
import s from './Button.module.css';

const Button = ({onSubmit,children}) =>
<button type="button" className={s.Button} onClick={onSubmit} >{children}</button>;

export default Button;