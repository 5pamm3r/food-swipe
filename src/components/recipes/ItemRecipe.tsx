import React from "react";
import { SkeletonItemRecipe } from "./skeleton";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  drag: string;
}
export function ItemRecipe({
  title,
  description,
  imageUrl,
  link,
  drag,
}: Props): JSX.Element {
  return (
    <div
      className={`tall:h-750 w-full flex items-center justify-center select-none touch-none ${drag} p-px bg-white rounded-2xl`}
    >
      <div className="h-full">
        <div className="h-60vh relative pointer-events-none">
          <Image
            className="rounded-t-2xl"
            src={imageUrl}
            alt="recipe"
            fill={true}
            sizes="(max-width: 500px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-4">
          <p className="font-bold mb-2 line-clamp-1 tall:line-clamp-none">
            {title}
          </p>
          <p className="line-clamp-3 text-gray-500">{description}</p>
          <a
            href={link}
            className="underline mt-2 block w-fit"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i>Ir a la receta</i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ItemRecipe;
