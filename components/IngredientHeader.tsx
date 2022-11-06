import { CSSProperties, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbSum } from "react-icons/tb";
import AttributeImage from "./AttributeImage";

export type SortBy =
    | "Name"
    | "Location"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "Total"
    | "Taste"
    | "Sensation"
    | "Aroma"
    | "Visual"
    | "Sound"
    | "Price"
    | "Value";
export type SortDir = "asc" | "desc";
export type IngredientSorting = {
    sortBy: SortBy | undefined;
    sortDir: SortDir | undefined;
};

const IngredientHeader = ({
    value,
    onChange,
}: {
    value: IngredientSorting;
    onChange: (val: IngredientSorting) => void;
}): JSX.Element => {
    const cycleDir = (cur?: SortDir): SortDir | undefined => {
        if (!cur) return "desc";
        if (cur === "desc") return "asc";
        if (cur === "asc") return undefined;
    };

    const handleClick = useCallback(
        (sortBy: SortBy) => {
            console.log({ sortBy, value });
            if (sortBy !== value.sortBy) {
                onChange({
                    sortBy,
                    sortDir: "desc",
                });
            } else {
                onChange({
                    sortBy,
                    sortDir: cycleDir(value.sortDir),
                });
            }
        },
        [value, onChange]
    );

    const getStyle = (
        key: SortBy,
        value: IngredientSorting,
        mode: number
    ): CSSProperties | undefined => {
        if (value.sortBy !== key) return undefined;
        if (!value.sortDir) return undefined;
        if (value.sortDir === "asc")
            return {
                borderBottom: "2px solid #C41",
                height:
                    mode === 0
                        ? undefined
                        : mode === 1
                        ? "calc(1.5rem + 4px)"
                        : mode === 2
                        ? "calc(2rem + 4px)"
                        : undefined,
                marginBottom: "-4px",
                paddingBottom: "2px",
            };
        else
            return {
                borderBottom: "2px solid #4C1",
                height:
                    mode === 0
                        ? undefined
                        : mode === 1
                        ? "calc(1.5rem + 4px)"
                        : mode === 2
                        ? "calc(2rem + 4px)"
                        : undefined,
                marginBottom: "-4px",
                paddingBottom: "2px",
            };
    };

    return (
        <div className="flex gap-8 items-center border-b-2 border-opacity-20 border-white pb-1 text-xl select-none cursor-pointer mb-1">
            {/* <div className="w-64" /> */}
            <p
                className="w-72 pl-4"
                onClick={() => handleClick("Name")}
                style={getStyle("Name", value, 0)}
            >
                Ingredient
            </p>
            <div
                title="Location"
                onClick={() => handleClick("Location")}
                style={getStyle("Location", value, 0)}
                className="w-8 grid place-items-center"
            >
                <FaMapMarkerAlt className="text-2xl" />
            </div>
            <div className="w-56 grid grid-cols-5 gap-1 place-items-center text-xl">
                <img
                    onClick={() => handleClick("A")}
                    style={getStyle("A", value, 1)}
                    src="img/misc/m-a.png"
                    alt="magimin-A"
                    className="w-6 h-6"
                />
                <img
                    onClick={() => handleClick("B")}
                    style={getStyle("B", value, 1)}
                    src="img/misc/m-b.png"
                    alt="magimin-B"
                    className="w-6 h-6"
                />
                <img
                    onClick={() => handleClick("C")}
                    style={getStyle("C", value, 1)}
                    src="img/misc/m-c.png"
                    alt="magimin-C"
                    className="w-6 h-6"
                />
                <img
                    onClick={() => handleClick("D")}
                    style={getStyle("D", value, 1)}
                    src="img/misc/m-d.png"
                    alt="magimin-D"
                    className="w-6 h-6"
                />
                <img
                    onClick={() => handleClick("E")}
                    style={getStyle("E", value, 1)}
                    src="img/misc/m-e.png"
                    alt="magimin-E"
                    className="w-6 h-6"
                />
            </div>
            <p
                title="Total Magimins"
                onClick={() => handleClick("Total")}
                style={getStyle("Total", value, 0)}
                className="w-14 grid place-items-center"
            >
                <TbSum className="text-3xl relative top-0.5" />
            </p>
            <div className="flex gap-1">
                <AttributeImage
                    onClick={() => handleClick("Taste")}
                    style={{ ...getStyle("Taste", value, 2), opacity: "100%" }}
                    className="w-8 h-8"
                    attribute={"Taste"}
                    value={0}
                />
                <AttributeImage
                    onClick={() => handleClick("Sensation")}
                    style={{ ...getStyle("Sensation", value, 2), opacity: "100%" }}
                    className="w-8 h-8"
                    attribute={"Sensation"}
                    value={0}
                />
                <AttributeImage
                    onClick={() => handleClick("Aroma")}
                    style={{ ...getStyle("Aroma", value, 2), opacity: "100%" }}
                    className="w-8 h-8"
                    attribute={"Aroma"}
                    value={0}
                />
                <AttributeImage
                    onClick={() => handleClick("Visual")}
                    style={{ ...getStyle("Visual", value, 2), opacity: "100%" }}
                    className="w-8 h-8"
                    attribute={"Visual"}
                    value={0}
                />
                <AttributeImage
                    onClick={() => handleClick("Sound")}
                    style={{ ...getStyle("Sound", value, 2), opacity: "100%" }}
                    className="w-8 h-8"
                    attribute={"Sound"}
                    value={0}
                />
            </div>
            <p
                onClick={() => handleClick("Price")}
                style={getStyle("Price", value, 0)}
                className="w-16 text-center"
            >
                Price
            </p>
            <div
                title="Value: Total Magimins divided by price"
                onClick={() => handleClick("Value")}
                style={getStyle("Value", value, 0)}
                className="flex w-20 justify-center items-center"
            >
                <TbSum className="text-3xl relative top-0.5" />
                <span className="text-2xl relative -top-0.5 mr-1">/</span>
                <img src="img/misc/coin.png" alt="coin" className="w-6 h-6 relative top-0.5" />
            </div>
        </div>
    );
};

export default IngredientHeader;
