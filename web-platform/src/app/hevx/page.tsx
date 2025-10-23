'use client';

import { useEffect } from 'react';

export default function HevXPage() {
  useEffect(() => {
    // Redirect to the static HevX.html file
    window.location.href = '/HevX/HevX.html';
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-green-500 font-mono">Loading HevX...</p>
      </div>
    </div>
  );
}
