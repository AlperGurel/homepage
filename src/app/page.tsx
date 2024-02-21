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
      <div className="text-stone-300 container mx-auto mt-8 md:mt-16 px-4 xl:px-0 leading-loose">
        <p className="mt-8">Selam, ben Alper. Kodlamaya meraklı bir bireyim.</p>
        <p className="mt-8">
          Merakım lisede Taleworlds tarafından çıkarılan Mount&Blade isimli
          oyuna mod yapma isteği ile başladı. Forumlarda python indirmen
          gerekiyor dediler, ben de oradan başladım. İlk hesap makinemi
          yaptıktan sonra bir dönem “E şimdi ben bu bilgiyle ne yapayım?”
          diyerek ara verdiysem de sonradan ezberim kötü olduğu için geçemediğim
          sözel dersleri ezberlemek için kodlamayı araç olarak kullanabileceğimi
          fark ettim; bana sürekli edebiyat soruları soran bir komut satırı
          uygulaması yazdım ve sonrasında hayatım başka bir pencereden bakmaya
          başladım.
        </p>
        <p className="mt-8">
          Çok sonraları, üniversite yıllarında, hırs edip bir C++ kitabı aldım
          ve bölüm sonlarındaki alıştırmaları yapmaya başladım. Burada edindiğim
          bilgiler bilgisayar mühendisi arkadaşlarımın ödevlerini yapmam için
          yetiyordu. Kodlayabildikçe daha da sever hale geldim ve o yaz için
          staj arayışlarına girdim. Çevre mühendisliği öğrencisi olsam da
          kendimi geliştirip yazılım sektöründe hayatımı devam ettirmeye
          kararlıydım, dolayısı ile stajımı da çevre mühendislerinin kullanacağı
          yazılımlar geliştiren bir yerde yapmak istedim. Biraz ben çalıştım,
          biraz şanslıydım ve böyle bir yere girebildim. Bu stajım da web
          alanında kendimi daha da geliştireceğim bir sürecin başlangıcı oldu.{" "}
        </p>
        <p className="mt-8">
          Sonraki yıllar kendimi farklı alanlarda geliştirmeye gayret ettim.
          Özellikle ilgimi çeken konulara eğildim, web tabanlı uygulamalar
          yaptım, machine learning temellerini öğrenerek JS ile kendi modelimi
          oluşturdum, oyun sektörüne girerek severek oynadığımız oyunların nasıl
          süreçlerden geçerek geliştirildiğini görme fırsatı buldum. Sektörün
          farklı yüzlerinde 4 senenin üzerinde profesyonel deneyime sahip oldum.
          Şu anda da developer rollerinde bir iş aramaktayım.{" "}
        </p>
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
