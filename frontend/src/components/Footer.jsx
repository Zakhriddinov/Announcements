import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/register" || pathname === "/login" ? null : (
        <footer className="w-full bg-slate-900 flex item-center justify-center p-6 md:p-3 absolute bottom-0 w-full">
          <span className="text-white font-mono font-regular text-xl lg:text-lg xl:text-xl md:text-sm">
            Copyright © E'lonlar doskasi 2022
          </span>
        </footer>
      )}
    </>
  );
};

export default Footer;
