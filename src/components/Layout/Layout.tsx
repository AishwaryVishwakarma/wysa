import React from 'react';

import Navbar from '../Navbar/Navbar';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  ...rest
}) => {
  return (
    <main {...rest}>
      {showNavbar && (
        <header>
          <Navbar />
        </header>
      )}
      {children}
    </main>
  );
};

export default Layout;
