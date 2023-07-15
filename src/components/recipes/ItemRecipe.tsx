import React from "react";

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
      className={`tall:h-750 w-full flex items-center justify-center touch-none ${drag} p-px bg-white rounded-2xl`}
    >
      <div className="h-full">
        <div className="h-60vh">
          <div
            className="bg-center bg-cover h-full rounded-t-2xl"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
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
