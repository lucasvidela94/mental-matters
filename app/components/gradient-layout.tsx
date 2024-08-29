import React from "react";

interface GradientLayoutProps {
  children: React.ReactNode;
}
const GradientLayout = ({ children }: GradientLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white">
      <div className="inset-0 bg-black opacity-10 pattern-grid-lg"></div>
      <div className="flex flex-col items-center space-y-8">{children}</div>
    </div>
  );
};

export default GradientLayout;
