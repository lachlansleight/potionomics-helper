import { CSSProperties } from "react";
import { Ingredient } from "lib/types";
import AttributeImage from "./AttributeImage";
import IngredientIcon from "./IngredientIcon";
import LocationIcon from "./LocationIcon";

const getOpacity = (value: number, total: number): CSSProperties => {
    return {
        opacity: 100 * (value / total) + "%",
    };
};

const IngredientRow = ({
    ingredient,
    hidden = false,
    alternate = false,
}: {
    ingredient: Ingredient;
    hidden?: boolean;
    alternate?: boolean;
}): JSX.Element => {
    return (
        <div
            className={`flex gap-8 items-center bg-black py-0.5 ${
                alternate ? "bg-opacity-10" : "bg-opacity-0"
            }`}
            style={hidden ? { display: "none" } : undefined}
        >
            <div className="pl-4">
                <IngredientIcon className="w-12 h-12" name={ingredient.name} />
            </div>
            <p className="w-48">{ingredient.name}</p>
            <LocationIcon name={ingredient.location} className="w-8 h-8" />
            <div className="w-56 grid grid-cols-5 gap-1 place-items-center text-xl">
                <span
                    style={getOpacity(ingredient.magimins[0], ingredient.totalMagimins)}
                    className="rounded border border-red-800 bg-red-800 w-10 h-8 grid place-items-center"
                >
                    {ingredient.magimins[0] === 0 ? "" : ingredient.magimins[0]}
                </span>
                <span
                    style={getOpacity(ingredient.magimins[1], ingredient.totalMagimins)}
                    className="rounded border border-green-800 bg-green-800 w-10 h-8 grid place-items-center"
                >
                    {ingredient.magimins[1] === 0 ? "" : ingredient.magimins[1]}
                </span>
                <span
                    style={getOpacity(ingredient.magimins[2], ingredient.totalMagimins)}
                    className="rounded border border-yellow-800 bg-yellow-800 w-10 h-8 grid place-items-center"
                >
                    {ingredient.magimins[2] === 0 ? "" : ingredient.magimins[2]}
                </span>
                <span
                    style={getOpacity(ingredient.magimins[3], ingredient.totalMagimins)}
                    className="rounded border border-blue-800 bg-blue-800 w-10 h-8 grid place-items-center"
                >
                    {ingredient.magimins[3] === 0 ? "" : ingredient.magimins[3]}
                </span>
                <span
                    style={getOpacity(ingredient.magimins[4], ingredient.totalMagimins)}
                    className="rounded border border-purple-800 bg-purple-800 w-10 h-8 grid place-items-center"
                >
                    {ingredient.magimins[4] === 0 ? "" : ingredient.magimins[4]}
                </span>
            </div>
            <p className="grid place-items-center w-14 bg-neutral-700 rounded text-2xl">
                {ingredient.totalMagimins}
            </p>
            <div className="flex gap-1">
                <AttributeImage
                    className="w-8 h-8"
                    attribute={"Taste"}
                    value={ingredient.attributes[0]}
                />
                <AttributeImage
                    className="w-8 h-8"
                    attribute={"Sensation"}
                    value={ingredient.attributes[1]}
                />
                <AttributeImage
                    className="w-8 h-8"
                    attribute={"Aroma"}
                    value={ingredient.attributes[2]}
                />
                <AttributeImage
                    className="w-8 h-8"
                    attribute={"Visual"}
                    value={ingredient.attributes[3]}
                />
                <AttributeImage
                    className="w-8 h-8"
                    attribute={"Sound"}
                    value={ingredient.attributes[4]}
                />
            </div>
            <div className="flex gap-2 w-16 text-xl items-center">
                <img src="img/misc/coin.png" alt="coin" className="w-8 h-8" />
                <p>{ingredient.price}</p>
            </div>
            <p className="w-20 text-xl text-center">
                {Math.round((100 * ingredient.totalMagimins) / ingredient.price) / 100}
            </p>
        </div>
    );
};

export default IngredientRow;
