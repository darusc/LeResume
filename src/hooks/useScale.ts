import { useState, useEffect } from "react";

export default function useScale(initial: number, ratio: number) {

  const [scale, setScale] = useState(initial);

  useEffect(() => {
    if (typeof window !== "undefined") {

      const resize = () => {

        let r = ratio;
        if(window.innerWidth < 500) {
          r = 1.2;
        }

        //let initialScale = 0.7;
        //if (window.innerWidth < 650) {
          //initialScale = 1.8;
        //}

        setScale(initial * (window.innerWidth / r / 793))
      }

      window.addEventListener('resize', resize);

      resize();

      return () => window.removeEventListener('resize', resize);

    }
  }, []);

  return scale;
}