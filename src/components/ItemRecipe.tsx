import React from "react";

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
      className={`h-full w-full flex items-center justify-center select-none touch-none ${drag} p-px bg-white rounded-2xl`}
    >
      <div className="h-full">
        <div className="h-60vh">
          <div
            className="bg-center bg-cover h-full rounded-t-2xl"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </div>
        <div className='p-4'>
          <p className="font-bold mb-2">{title}</p>
          <p className="line-clamp-3 text-gray-500">{description}</p>
          <a href={link} className="underline mt-4" rel="noopener noreferrer" target='_blank'>Visit</a>
        </div>
      </div>
    </li>
  );
};

export default ItemRecipe;
