'use client'

import { useEffect, useState } from "react";

interface BodyProps {
  children?: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const header = document.querySelector('.header-nav') as HTMLElement;

      const setHeight = () => {
        if (header) {
          setHeaderHeight(header.offsetHeight);
        }
      };

      const observer = new ResizeObserver(setHeight);

      if (header) {
        observer.observe(header);
      }

      setHeight();

      return () => {
        if (header) {
          observer.unobserve(header);
        }
      };
    }
  }, []);

  return (
    <div className='body-container' style={{ marginTop: `${headerHeight}px` }}>
      {children}
    </div>
  );
};

export default Body;
