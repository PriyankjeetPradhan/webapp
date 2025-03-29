import React from "react";

const Header = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#27293D] text-white">
      <img
        src="https://timepass.games/images/logo.png"
        alt="Time Pass Logo"
        className="h-10 cursor-pointer"
        onClick={handleRedirect}
      />
      <span className="text-lg">Priyank012</span>
    </header>
  );
};

export default Header;
