import React from "react";

const Header = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold cursor-pointer" onClick={handleRedirect}>
        TimePass Games
      </h1>
      <span className="text-lg">UserName</span>
    </header>
  );
};

export default Header;
