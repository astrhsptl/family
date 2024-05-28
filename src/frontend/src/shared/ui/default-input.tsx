'use client';

import { ErrorMessage } from '@hookform/error-message';
import { ClassValue } from 'clsx';
import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { InputError } from './input-error';

type DefaultInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  registerOptions: RegisterOptions;
  placeholder?: string;
  className?: ClassValue;
};

export const DefaultInput: React.FC<DefaultInputProps> = ({
  name,
  registerOptions,
  type,
  placeholder,
}) => {
  const [_, setIsActiveInput] = useState<boolean>(false);
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <input
        {...register(name, registerOptions)}
        type={type}
        onFocus={() => {
          setIsActiveInput(true);
        }}
        onBlur={(e) => {
          setIsActiveInput(false || e.target.value !== '');
        }}
      />
      <span>{placeholder ?? name}</span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <InputError message={message} />}
      />
    </div>
  );
};
