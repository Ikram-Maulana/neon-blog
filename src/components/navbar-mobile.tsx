import ThemeToggleMobile from "@/components/theme-toggle-mobile";
import { NAVBAR_MOBILE } from "@/lib/config";
import { Separator } from "@/ui/separator";
import Link from "next/link";

const NavbarMobile = () => {
  return (
    <div className="container fixed inset-0 top-[72px] z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto py-6 max-w-7xl mx-auto px-8 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 p-4 rounded-md shadow-lg outline outline-1 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-sm outline-zinc-200 dark:outline-zinc-800">
        <nav className="grid grid-flow-row text-sm auto-rows-max">
          {NAVBAR_MOBILE.map((item) => (
            <Link
              key={`mobileNav-${item.name}`}
              href={item.href}
              className="flex items-center w-full p-2 text-sm font-medium rounded-md hover:underline"
              target={item.newPage ? "_blank" : "_self"}
              rel={item.newPage ? "noopener noreferrer" : ""}
            >
              {item.name}
            </Link>
          ))}

          <>
            <div className="py-3">
              <Separator />
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-500 dark:text-gray-400">Switch theme</p>
              <ThemeToggleMobile />
            </div>
          </>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMobile;
