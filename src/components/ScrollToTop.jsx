import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to top as requested
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Also scroll the internal main container since the app uses a fixed layout with internal scrolling
    const mainContainers = document.querySelectorAll('main');
    mainContainers.forEach(container => {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [pathname]);

  return null;
}
