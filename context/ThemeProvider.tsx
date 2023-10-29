import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeTypes {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeTypes | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");
  const handleThemeChange = () => {
    if (mode === "light") {
      document.documentElement.classList.add("dark");
      setMode("dark");
    } else {
      setMode("light");
      document.documentElement.classList.add("light");
    }
  };
  useEffect(() => handleThemeChange(), [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
export default ThemeProvider;
