import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { BaseStyle, montserrat } from '../styles';

interface InputErrorProps {
  message: string;
}

export const InputError: React.FC<InputErrorProps> = ({ message }) => {
  return (
    <div className={clsx(BaseStyle.inputError, montserrat.className)}>
      <Image height={12} width={12} src='/message-alert.svg' alt='Alert' />
      {message}
    </div>
  );
};
