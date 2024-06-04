'use client';

import Image from 'next/image';
import { BaseStyle } from '../styles';

type BackButtonProps = JSX.IntrinsicElements['div'] & {};

export const BackButton = (props: BackButtonProps) => {
  return (
    <div className={BaseStyle.backButton} {...props}>
      <Image src={'/chevron-back.svg'} height={30} width={30} alt='Back' />
    </div>
  );
};
