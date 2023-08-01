"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  ChevronDownIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggleMobile = () => {
  const [themeSwitcher, setThemeSwitcher] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      setThemeSwitcher("light");
    } else if (theme === "dark") {
      setThemeSwitcher("dark");
    } else {
      setThemeSwitcher("system");
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("flex space-x-2 w-40")}>
          {themeSwitcher === "light" ? (
            <>
              <SunIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold">Light</p>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
            </>
          ) : themeSwitcher === "dark" ? (
            <>
              <MoonIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold">Dark</p>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
            </>
          ) : (
            <>
              <MoonIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold">System</p>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
            </>
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(theme === "light" && "bg-sky-500 text-zinc-50 ")}
        >
          <span className="font-semibold">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(theme === "dark" && "bg-sky-400 text-zinc-50")}
        >
          <span className="font-semibold">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(theme === "system" && "bg-sky-400 text-zinc-50")}
        >
          <span className="font-semibold">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggleMobile;
