import { RecipeContext } from "@/context/recipeContext";
import React, { FC, useContext } from "react";
interface Props {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const Favourites: FC<Props> = ({ modalActive, setModalActive }) => {
  const {
    state: { favorites },
  } = useContext(RecipeContext);
  return (
    <>
      <div>
        <button
          className="absolute top-0 left-0 right-0 mx-auto bg-red z-20 text-2xl underline font-bold overflow-y-hidden"
          onClick={() => setModalActive(!modalActive)}
        >
          Back
        </button>
      </div>
      <ul className="flex flex-col fixed max-w-2xl h-full z-10 bg-white overflow-y-scroll pt-8">
        {favorites.map((recipe, index) => (
          <li
            key={index}
            className="border border-black grid grid-cols-3 items-center justify-center [&>*:nth-child(3)]:text-center"
          >
            <div
              className="w-28 h-28 bg-cover bg-center"
              style={{
                backgroundImage: `url(${recipe.yoast_head_json.og_image?.[0]?.url})`,
              }}
            ></div>
            <h1>{recipe.yoast_head_json.og_title}</h1>
            <a
              className="underlinez"
              href={recipe.yoast_head_json.og_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              link
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favourites;
