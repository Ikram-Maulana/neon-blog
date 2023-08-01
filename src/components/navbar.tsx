"use client";

import BurgerButton from "@/components/burger-button";
import ThemeToggle from "@/components/theme-toggle";
import { NAVBAR } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";
import { Separator } from "@/ui/separator";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <header
      className="sticky top-0 z-40 flex-none w-full mx-auto transition-all duration-100 ease-in bg-zinc-50 dark:bg-zinc-900 lg:bg-zinc-50/90 lg:backdrop-blur-sm dark:lg:bg-zinc-900/90"
      id="header"
    >
      <div className="container w-full py-6 mx-auto max-w-7xl lg:flex lg:items-center lg:justify-between">
        <div className="flex justify-between lg:block">
          <Link href="/">
            <Image
              priority
              src="/logo-ipsum.webp"
              width={155}
              height={36}
              alt="Logo Ipsum"
              className="pr-4"
            />
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <BurgerButton />
          </div>
        </div>
        <NavigationMenu className={cn("hidden lg:flex")}>
          <NavigationMenuList>
            {NAVBAR.map((item) => (
              <NavigationMenuItem key={`nav-${item.name}`}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem className="px-2">
              <Separator orientation="vertical" className={cn("h-[36px]")} />
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="https://ikram-maulana.tech" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIcon className="w-4 h-4" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://github.com/Ikram-Maulana/neon-blog"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="w-4 h-4" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Navbar;
