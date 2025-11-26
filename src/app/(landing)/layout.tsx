import { Footer, Navbar } from '@/components';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const LandingPageLayout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <div className="container px-12 py-8">{children}</div>
      <Footer />
    </>
  );
};

export default LandingPageLayout;
