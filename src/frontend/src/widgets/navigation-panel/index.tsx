'use client';

import { NavLink } from '@/shared';
import Image from 'next/image';

interface NavigationPanelProps {}
export const NavigationPanel = ({}: NavigationPanelProps) => {
  return (
    <section>
      <NavLink href={'/family'}>
        <Image src={'/heart.svg'} alt='Family' height={24} width={24} />
        <p>Family</p>
      </NavLink>
      <NavLink href={'/family/tasks'}>
        <Image src={'/edit.svg'} alt='Tasks' height={24} width={24} />
        <p>Tasks</p>
      </NavLink>
      <NavLink href={'/family/events'}>
        <Image src={'/star.svg'} alt='Events' height={24} width={24} />
        <p>Events</p>
      </NavLink>
      <NavLink href={'/family/notifications'}>
        <Image src={'/bell.svg'} alt='Notifications' height={24} width={24} />
        <p>Notifications</p>
      </NavLink>
    </section>
  );
};
