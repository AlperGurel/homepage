import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [totalCommit, setTotalCommit] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position1, setPosition1] = useState("translate-x-[-300px]");
  const [position2, setPosition2] = useState("translate-x-[-400px]");
  const [position3, setPosition3] = useState("translate-x-[-500px]");

  const pathname = usePathname();

  var extractLastPage = (url: string): string | null => {
    const regex = /<([^>]+)>;\s*rel="last"/;
    const match = url.match(regex);

    if (match && match[1]) {
      const queryParams = new URLSearchParams(match[1].split("?")[1]);
      return queryParams.get("page");
    }
    return null;
  };

  useEffect(() => {
    var fetchCommit = async () => {
      var response = await fetch(
        "https://api.github.com/repos/AlperGurel/homepage/commits?sha=main&per_page=1&page=1"
      );
      var data = await response.json();
      var linkHeader = response.headers.get("link");
      if (linkHeader) {
        var lastPage = extractLastPage(linkHeader);
        setTotalCommit(parseInt(lastPage ? lastPage : "0"));
      }
    };

    fetchCommit();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setPosition1("translate-x-[0px]");
      setPosition2("translate-x-[0px]");
      setPosition3("translate-x-[0px]");
    } else {
      setPosition1("translate-x-[-300px]");
      setPosition2("translate-x-[-300px]");
      setPosition3("translate-x-[-300px]");
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {mobileMenuOpen && (
        <div className="absolute w-full h-screen bg-slate-900/80 backdrop-blur-sm z-10">
          <div
            className="absolute top-6 right-4 font-bold cursor-pointer text-xl select-none z-10"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            K
          </div>
          <nav className=" ml-[60px] mt-[-100px] h-full">
            <ul
              className={`flex flex-col justify-center h-full gap-8 relative`}
            >
              <li
                className={`font-bold text-2xl cursor-pointer ${position1} transition-transform`}
              >
                <Link href="/"> /</Link>
              </li>
              <li
                className={`font-bold text-2xl cursor-pointer ${position3} transition-transform duration-300`}
              >
                <Link href="/portfolio">Portföy</Link>
              </li>
              <li
                className={`font-bold text-2xl cursor-pointer ${position3} transition-transform duration-300`}
              >
                <Link href="/ilham-perileri">İlham Perilerim</Link>
              </li>
              <li
                className={`font-bold text-2xl cursor-pointer ${position2} transition-transform duration-500`}
              >
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <header className="w-full pt-4 md:pt-12">
        <div className="container mx-auto py-2 px-4 xl:px-0 flex justify-between items-end">
          <div className="cursor-pointer transition text-primary text-xl md:text-2xl font-logo">
            <Link href="/">Alper Gürel</Link>
          </div>
          <nav className="mr-auto hidden ml-12 lg:ml-24 md:block">
            <ul className="flex gap-8 lg:gap-16">
              <li
                className={`cursor-pointer ${
                  pathname === "/portfolio" && "border-secondary border-b-2"
                }`}
              >
                <Link href="/portfolio">Portföy</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  pathname === "/ilham-perileri" &&
                  "border-secondary border-b-2"
                }`}
              >
                <Link href="/ilham-perileri">İlham Perilerim</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  pathname === "/blog" && "border-secondary border-b-2"
                }`}
              >
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            Site yapımındaki commit sayısı
            <b className="text-primary text-xl"> {totalCommit}</b>.
          </div>
          <div
            className="font-bold md:hidden cursor-pointer select-none text-xl"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
          >
            M
          </div>
        </div>
      </header>
    </>
  );
}
