import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container flex items-center justify-center mx-auto max-w-7xl">
      <div className="py-6 md:flex md:items-center md:justify-center md:py-8">
        <div className="text-gray-600 dark:text-zinc-400">
          Made by{" "}
          <Link
            className="underline underline-offset-2 decoration-dotted decoration-emerald-500 dark:decoration-emerald-400"
            href="https://ikram-maulana.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Ikram Maulana
          </Link>{" "}
          · All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
