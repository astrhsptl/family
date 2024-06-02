'use client';

import { NavLink, PanelStyles } from '@/shared';
import Image from 'next/image';

interface NavigationPanelProps {}

const Links = [
  {
    href: '/family',
    img: '/heart.svg',
    alt: 'Family',
  },
  {
    href: '/family/tasks',
    img: '/edit.svg',
    alt: 'Tasks',
  },
  {
    href: '/family/events',
    img: '/star.svg',
    alt: 'Events',
  },
  {
    href: '/family/notifications',
    img: '/bell.svg',
    alt: 'Notifies',
  },
];

export const NavigationPanel = ({}: NavigationPanelProps) => {
  return (
    <aside className={PanelStyles.panelLayout}>
      {Links.map(({ alt, href, img }) => (
        <NavLink href={href} key={img}>
          <Image src={img} alt={alt} height={24} width={24} />
          <p className={PanelStyles.panelLink}>{alt}</p>
        </NavLink>
      ))}
    </aside>
  );
};
