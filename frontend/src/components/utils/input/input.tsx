import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import './input.scoped.css';

export interface InputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  options?: any;
  autoFocus?: boolean;
  label?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}
 
const Input: React.FunctionComponent<InputProps & React.AllHTMLAttributes<HTMLInputElement>> = (props) => {
  const { label, name, register, options, type, autoFocus, className, disabled } = props;
  return (
    <div className={className}>
      {label &&
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold">{label}</label>}
      <input
        id={name}
        type={type ?? 'text'}
        autoFocus={autoFocus}
        disabled={disabled}
        {...register(name, { ...options })}
        className="block bg-bg-secondary rounded focus:outline-none w-full h-10 p-2 mt-2" />
    </div>
  );
}
 
export default Input;