import { useState, useEffect } from "react";

export const useOnScroll = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsBlurred(scrollTop > 10);

    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isBlurred};
};
