'use client';

import { ErrorMessage } from '@hookform/error-message';
import { ClassValue } from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BaseStyle } from '../styles';
import { InputError } from './input-error';

type DefaultInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  icon?: string;
  registerOptions: RegisterOptions;
  placeholder?: string;
  className?: ClassValue;
};

export const DefaultInput: React.FC<DefaultInputProps> = ({
  name,
  registerOptions,
  placeholder,
  icon,
  ...props
}) => {
  const [_, setIsActiveInput] = useState<boolean>(false);
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <div className={BaseStyle.defaultInputContainer}>
        <div className={BaseStyle.inputImageContainer}>
          {icon ? (
            <Image src={icon} alt={name} height={24} width={24} />
          ) : (
            <></>
          )}
          <input
            {...props}
            {...register(name, registerOptions)}
            className={BaseStyle.nestedInput}
            onFocus={() => {
              setIsActiveInput(true);
            }}
            onBlur={(e) => {
              setIsActiveInput(false || e.target.value !== '');
            }}
            placeholder={placeholder}
          />
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <InputError message={message} />}
      />
    </div>
  );
};
