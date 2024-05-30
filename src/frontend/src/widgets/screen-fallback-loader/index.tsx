import { ScreenFallbackStyles, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface ScreenFallbackLoaderProps {}

export const ScreenFallbackLoader: React.FC<ScreenFallbackLoaderProps> = () => {
  return (
    <div className={ScreenFallbackStyles.container}>
      <Image src='/logo-mark.svg' alt='icon' width={150} height={150} />
      <div>
        <p className={clsx(montserrat.className)}>
          © Dev Lab, {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
