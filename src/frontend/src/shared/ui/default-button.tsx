import clsx, { ClassValue } from 'clsx';
import { ReactNode } from 'react';
import { BaseStyle } from '../styles';

type DefaultButtonProps = {
  children?: ReactNode | string;
  className?: ClassValue;
  isLoading?: boolean;
} & JSX.IntrinsicElements['button'];

export function DefaultButton({
  isLoading,
  children,
  style,
  className,
  ...other
}: DefaultButtonProps) {
  return (
    <button
      {...other}
      className={clsx(className ? className : BaseStyle.baseButton)}
    >
      {children}
    </button>
  );
}
