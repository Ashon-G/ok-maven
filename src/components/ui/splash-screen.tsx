import { useEffect, useState } from "react";
import { LoadingAnimation } from "./loading-animation";

export const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <LoadingAnimation className="scale-150" />
    </div>
  );
};