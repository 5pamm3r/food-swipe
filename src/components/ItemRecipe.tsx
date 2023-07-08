import React, { useState } from "react";
import { DraggableProps } from "react-draggable";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  drag: string;
}
const ItemRecipe: React.FC<Props> = ({
  title,
  description,
  imageUrl,
  link,
  drag,
}) => {
  return (
    <li
      className={`h-full w-full flex items-center justify-center select-none touch-none ${drag} border border-black p-2`}
    >
      <div className="h-full">
        <div className="h-60vh">
          <div
            className="bg-center bg-cover h-full"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </div>
        <p className="font-bold mb-2">{title}</p>
        <p className="line-clamp-3 text-gray-500">{description}</p>
        <a href={link} className="underline" rel="noopener noreferrer">Go recipe</a>
      </div>
    </li>
  );
};

export default ItemRecipe;
