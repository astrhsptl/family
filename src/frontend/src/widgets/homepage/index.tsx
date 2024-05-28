import { DefaultButton, HomeStyles } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';

export async function HomepageLayout() {
  return (
    <div className={clsx(HomeStyles.homeContainer)}>
      <div>
        <h1>New family app</h1>
        <p>
          Are you looking for recommendations of family-friendly to-do list apps
          that can help you stay organized and keep track of all tasks for your
          household?
        </p>
        <DefaultButton>Get started</DefaultButton>
      </div>
      <Image
        src={'/sigma.png'}
        alt='sigma space family'
        width={300}
        height={200}
      />
    </div>
  );
}
