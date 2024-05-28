'use client';

import { DefaultButton, HomeStyles, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';

export function HomepageLayout() {
  return (
    <>
      <div className={clsx(HomeStyles.homeContainer)}>
        <div className={clsx(HomeStyles.homeText, montserrat.className)}>
          <h1>New family app</h1>
          <p>
            Are you looking for recommendations of family-friendly to-do list
            apps that can help you stay organized and keep track of all tasks
            for your household?
          </p>
          <DefaultButton>Get started</DefaultButton>
        </div>
        <Image
          src={'/sigma.png'}
          alt='sigma space family'
          width={300}
          height={200}
          className={clsx(HomeStyles.homeImg)}
        />
      </div>
    </>
  );
}
