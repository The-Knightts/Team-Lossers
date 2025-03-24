import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="bg-[#111827] h-full overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full"></div>
    </main>
  );
};

export default Layout;
