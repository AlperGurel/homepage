"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./context/themeContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    var fetchData = async () => {
      var response = await fetch("/posts/post.md");
      var content = await response.text();
      setFileContent(content);
    };

    fetchData();
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
            Son commit <b>3 gün</b> önce. Toplam <b>32</b> commit.
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
        <div className="bg-sLight text-primary p-4 shadow-md rounded-md mt-3 flex">
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
        <div className="p-4 shadow-md rounded-md mt-3 markdown-wrapper">
          <Markdown remarkPlugins={[remarkGfm]}>{fileContent}</Markdown>
        </div>
      </div>
    </div>
  );
}
