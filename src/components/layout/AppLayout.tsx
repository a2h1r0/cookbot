'use client';

import { ReactNode } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function AppLayout({
  children,
  showBottomNav = false,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className={`max-w-md mx-auto ${showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
