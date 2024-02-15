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
    <div className="relative text-slate-700">
      <header className="fixed bg-white w-full top-0 bg-b shadow-sm backdrop-blur-sm border-b-2 border-black">
        <div className="container mx-auto py-2 px-4 flex justify-between">
          <div className="py-2 px-4 rounded-sm cursor-pointer transition hover:bg-slate-200">
            <b>/</b>
          </div>
          <div className="py-2">
            Son commit <b>3 gün</b> önce. Toplam <b>{totalCommit}</b> commit.
          </div>
          <div className="flex gap-2">
            <div className="py-2 px-4 rounded-sm cursor-pointer transition hover:bg-slate-200">
              Blog
            </div>
            <div
              className="py-2 px-4 rounded-sm cursor-pointer transition hover:bg-slate-200"
              onClick={handleThemeSwitch}
            >
              Theme Switch
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4 mt-12">
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
      </div>
    </div>
  );
}
