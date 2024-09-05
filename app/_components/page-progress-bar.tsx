'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import './page-progress-bar.css';

export default function PageProgressBar() {
  return (
    <ProgressBar
      options={{ showSpinner: false }}
      height="4px"
      color="hsl(var(--primary))"
    />
  );
}
