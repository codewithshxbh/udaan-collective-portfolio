"use client"

import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add a CSS class to the body element when on admin pages
  useEffect(() => {
    // Add the admin-page class to hide the global navbar
    document.body.classList.add('admin-page');
    
    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
