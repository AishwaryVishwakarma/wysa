import React from 'react';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children, ...rest}) => {
  return <main {...rest}>{children}</main>;
};

export default Layout;
