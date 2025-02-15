import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-background h-full overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </div>
  );
};

export default Layout;
