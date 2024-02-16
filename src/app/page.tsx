"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./context/themeContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [fileContent, setFileContent] = useState<string>("");
  const [totalCommit, setTotalCommit] = useState(0);

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
    var fetchData = async () => {
      var response = await fetch("/posts/post.md");
      var content = await response.text();
      setFileContent(content);
    };

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

    fetchData();
    fetchCommit();
  }, []);

  const handleThemeSwitch = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="relative">
      <header className="w-full pt-12">
        <div className="container mx-auto py-2 px-4 flex justify-between items-end">
          <div className="cursor-pointer transition text-primary text-2xl font-logo">
            Alper Gürel
          </div>
          <div className="flex gap-1 mr-auto ml-12">
            <div className="cursor-pointer transition">Portföy</div>
          </div>
          <div className="">
            Site yapımındaki commit sayısı
            <b className="text-primary text-xl"> {totalCommit}</b>.
          </div>
        </div>
      </header>

      <div className="h-[300px] bg-gradient-to-t from-[#222f3d] to-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="relative bottom-[0]"
        >
          <path
            fill="#0E141A"
            fill-opacity="1"
            d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,149.3C840,128,960,128,1080,128C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="text-white mt-[130px] container mx-auto">content</div>

      {/* <div className="container mx-auto p-4 mt-12">
        <div className="bg-white text-primary p-4 shadow-md rounded-md mt-3 flex">
          <div className="basis-1/2">
            <div className="flex items-end">
              <span className="text-[32px]">Blog 1</span>{" "}
              <span className="ml-3 mb-2">·</span>{" "}
              <span className="ml-3 mb-2 text-primary/50">13.10.2024</span>
            </div>
            <div>
              I'm a very curious person, thus I like to experiment, create, and
              discover new things. I like to challenge myself; and programming
              is one way to do that.
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md mt-3 markdown-wrapper">
          <Markdown remarkPlugins={[remarkGfm]}>{fileContent}</Markdown>
        </div>
      </div> */}
    </div>
  );
}
