import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const { width: dimension } = useWindowDimensions();

  useEffect(() => {
    setWidth(dimension!);
  }, [dimension]);

  useEffect(() => {
    setIsMobile(width <= 520);
  }, [width]);

  return isMobile;
}

export default useMobile;
