import { useEffect, useState } from "react";

export function BackItem({ deltaX }: { deltaX: number }): JSX.Element {
  const [opacity, setOpacity] = useState<string>("0");

  const changeBack = (x: number) => {
    if (x < 0 && x > -100) {
      const newOpacity = Math.floor((x / -100) * 9) + 1;
      const opacityClassName = `0.${newOpacity}`;
      setOpacity(opacityClassName);
    } else if (x >= 0) {
      setOpacity("0");
    }
  }
  useEffect(() => {
    changeBack(deltaX)
  }, [deltaX])

  return (
    <div
      className={`w-full h-full bg-red-400 flex items-center justify-end pr-4 text-white  absolute top-0 right-0 -z-10 rounded-md`}
      style={{ opacity: opacity }}
    >
      Eliminar
    </div>
  )
}