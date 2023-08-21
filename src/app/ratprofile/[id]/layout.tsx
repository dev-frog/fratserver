import React, { ReactNode } from "react";
import Navbar from "../../../../component/Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main className="flex min-h-screen flex-col justify-between p-24">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
