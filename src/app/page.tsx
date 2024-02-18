"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./context/themeContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./header";

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
    <div className="relative">
      <Header />
      <div className="bg-gradient-to-t from-[#202d3b] to-background pt-[60px] md:pt-[200px]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[60px] w-[100%] botom-0"
        >
          <path
            fill="#0E141A"
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          ></path>
        </svg>
      </div>
      <div className="text-stone-300 container mx-auto mt-8 md:mt-32 px-4 xl:px-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
        sagittis odio. Vivamus ullamcorper diam sit amet odio condimentum, sit
        amet scelerisque tellus sodales. Ut massa purus, luctus id ultricies ac,
        finibus sit amet mauris. Vestibulum tincidunt posuere nulla non
        elementum. Duis a massa diam. Curabitur nec urna tempor nisl malesuada
        viverra non sed lorem. Pellentesque sit amet placerat massa. Vestibulum
        et leo interdum eros vulputate faucibus. Curabitur pretium urna tellus,
        quis tincidunt sapien blandit eget. Vestibulum congue interdum libero,
        nec volutpat tellus consequat vitae. In hac habitasse platea dictumst.
        Nulla vel dolor pellentesque enim consequat maximus vitae quis ante.
        Integer pretium purus pharetra elit dapibus, rutrum efficitur enim
        tristique.
      </div>

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
