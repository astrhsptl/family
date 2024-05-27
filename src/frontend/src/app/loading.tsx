'use client';

import { ScreenFallbackLoader } from '@/widgets';
import { FC } from 'react';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return <ScreenFallbackLoader />;
};

export default Loading;
