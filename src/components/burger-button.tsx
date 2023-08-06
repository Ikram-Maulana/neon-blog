"use client";

import NavbarMobile from "@/components/navbar-mobile";
import { Button } from "@/ui/button";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useLockedBody, useWindowSize } from "usehooks-ts";

const BurgerButton = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [locked, setLocked] = useLockedBody(false, "root");
  const { width } = useWindowSize();

  const hamburgerClickHandler = () => {
    setShowMobileMenu(!showMobileMenu);
    setLocked(!locked);
  };

  useEffect(() => {
    if (width >= 768 && showMobileMenu) {
      setShowMobileMenu(false);
      setLocked(false);
    }
  }, [width, showMobileMenu, setLocked]);

  return (
    <>
      <Button
        className="block px-3 lg:hidden"
        variant="outline"
        onClick={hamburgerClickHandler}
        aria-label="Toggle menu"
      >
        {showMobileMenu ? (
          <Cross2Icon className="w-4 h-4" />
        ) : (
          <HamburgerMenuIcon className="w-4 h-4" />
        )}
      </Button>
      {showMobileMenu && <NavbarMobile />}
    </>
  );
};

export default BurgerButton;
