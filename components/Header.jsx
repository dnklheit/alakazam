import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href='#home'>
          <Image
            height={100}
            width={100}
            src="/pokemon-logo.png"
            alt="logo"
            priority={true}
            className="mr-2"
          />
          </a>
          <div className="text-white text-2xl lg:text-3xl font-bold font-bangers">Profiler</div>
          <small className="text-white text-sm font-thin">&trade;&nbsp;</small>
        </div>
      </div>
    </header>
  );
};

export default Header;
