'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
}

export default function Input(props: InputProps) {

  const {label, id, type, register, errors, disabled, required } = props;

  return ( 
    <div>
      <label 
        htmlFor={id} 
        className="
          mt-2
          block 
          text-sm
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          required={required}
          {...register(id, { required })}
          className={`
            w-full
            border
            p-2
            ${errors[id] && 'focus:ring-rose-500'}
            ${disabled && 'opacity-50 cursor-default'}
          `}
        />
      </div>
    </div>
   );
}