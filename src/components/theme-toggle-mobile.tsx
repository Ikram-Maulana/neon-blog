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

const ThemeToggleMobile = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("px-3 flex space-x-2")}>
          {theme === "light" ? (
            <>
              <SunIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold">Light</p>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
            </>
          ) : theme === "dark" ? (
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
