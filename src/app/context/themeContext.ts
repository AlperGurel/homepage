import { createContext } from "react";
import { SetStateAction } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: (value: SetStateAction<"light" | "dark">) => {},
});

export default ThemeContext;
