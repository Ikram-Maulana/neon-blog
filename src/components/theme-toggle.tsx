"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("px-3")}>
          {theme === "light" ? (
            <SunIcon className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          ) : theme === "dark" ? (
            <MoonIcon className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon
            className={cn("w-4 h-4 mr-2", theme === "light" && "text-sky-500")}
          />
          <span
            className={cn("font-bold", theme === "light" && "text-sky-500")}
          >
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon
            className={cn("w-4 h-4 mr-2", theme === "dark" && "text-sky-400")}
          />
          <span className={cn("font-bold", theme === "dark" && "text-sky-400")}>
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <LaptopIcon
            className={cn("w-4 h-4 mr-2", theme === "system" && "text-sky-400")}
          />
          <span
            className={cn("font-bold", theme === "system" && "text-sky-400")}
          >
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;