'use client';

import { currentFamily } from '@/entities';
import { useAppSelector } from '@/features';
import { BackButton, FamilyStyles, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FamilyHeaderProps {}

export const FamilyHeader = ({}: FamilyHeaderProps) => {
  const router = useRouter();
  const family = useAppSelector(currentFamily);

  return (
    <article className={clsx(FamilyStyles.familyHeader)}>
      <div className={FamilyStyles.backLinkContainer}>
        <BackButton onClick={() => router.push('/')} />
      </div>

      <div>
        <Image
          src={'/onboarding-image.png'}
          height={170}
          width={170}
          alt='Back'
        />
        <p className={clsx(FamilyStyles.textContainer, montserrat.className)}>
          {family.family?.last_name}
        </p>
      </div>
    </article>
  );
};
