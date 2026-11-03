// The demo has no server: today's lunch, the team and their picks all come from the sample data in
// src/data/demo.ts, kept in this browser. (The full app swaps them for the lunch API here.)

import type { ReactNode } from 'react';

export function LiveStore({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
