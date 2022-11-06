import { useState } from "react";
import { gamePhases, ingredients } from "lib/data";
import { Ingredient, IngredientLocation } from "lib/types";
import { IngredientFilters } from "./IngredientFilter";
import IngredientHeader, { IngredientSorting } from "./IngredientHeader";
import IngredientRow from "./IngredientRow";

const filterIngredient = (ing: Ingredient, filters?: IngredientFilters): boolean => {
    if (!filters) return true;

    if (ing.totalMagimins % filters.magiminFactor !== 0) return false;
    if (filters.magiminFactorAll) {
        for (let i = 0; i < 5; i++) {
            if (ing.magimins[i] % filters.magiminFactor !== 0) return false;
        }
    }

    if (filters.magiminAll) {
        for (let i = 0; i < 5; i++) {
            if (filters.magimins[i] && ing.magimins[i] === 0) return false;
            if (filters.magiminExclusive && !filters.magimins[i] && ing.magimins[i] > 0)
                return false;
        }
    } else {
        let orValid = false;
        for (let i = 0; i < 5; i++) {
            if (filters.magimins[i] && ing.magimins[i] > 0) orValid = true;
            if (filters.magiminExclusive && !filters.magimins[i] && ing.magimins[i] > 0)
                return false;
        }
        if (!orValid) return false;
    }

    if (filters.attributeAll) {
        for (let i = 0; i < 5; i++) {
            if (filters.attributes[i] && ing.attributes[i] <= 0) return false;
            if (filters.attributeExclusive && !filters.attributes[i] && ing.attributes[i] < 0)
                return false;
        }
    } else {
        let orValid = false;
        for (let i = 0; i < 5; i++) {
            if (filters.attributes[i] && ing.attributes[i] === 1) orValid = true;
            if (filters.attributeExclusive && !filters.attributes[i] && ing.attributes[i] < 0)
                return false;
        }
        if (!orValid) return false;
    }

    if (!gamePhases[filters.phase - 1].includes(ing.location)) return false;
    if (filters.phaseExact) {
        let count = 0;
        for (let i = 0; i < filters.phase; i++) {
            if (gamePhases[i].includes(ing.location)) count++;
        }
        if (count > 1) return false;
    }

    return true;
};

const locationSort: Record<IngredientLocation, number> = {
    "Enchanted Forest": 0,
    "Mushroom Mire": 1,
    "Bone Wastes": 2,
    "Storm Plains": 3,
    "Ocean Coasts": 4,
    "Shadow Steppe": 5,
    "Sulfuric Falls": 6,
    "Ice Craggs": 7,
    "Crystalline Forest": 8,
    Arctic: 9,
    "Dragon Oasis": 10,
    Crater: 11,
    "Magical Wasteland": 12,
};
const sortIngredient = (a: Ingredient, b: Ingredient, sorting: IngredientSorting) => {
    let val = a.defaultSortOrder - b.defaultSortOrder;
    if (!sorting.sortBy || !sorting.sortDir) return val;
    if (sorting.sortBy === "Name") val = a.name.localeCompare(b.name);
    else if (sorting.sortBy === "Location")
        val = locationSort[a.location] - locationSort[b.location];
    else if (sorting.sortBy === "A") val = a.magimins[0] - b.magimins[0];
    else if (sorting.sortBy === "B") val = a.magimins[1] - b.magimins[1];
    else if (sorting.sortBy === "C") val = a.magimins[2] - b.magimins[2];
    else if (sorting.sortBy === "D") val = a.magimins[3] - b.magimins[3];
    else if (sorting.sortBy === "E") val = a.magimins[4] - b.magimins[4];
    else if (sorting.sortBy === "Total") val = a.totalMagimins - b.totalMagimins;
    else if (sorting.sortBy === "Taste") val = a.attributes[0] - b.attributes[0];
    else if (sorting.sortBy === "Sensation") val = a.attributes[1] - b.attributes[1];
    else if (sorting.sortBy === "Aroma") val = a.attributes[2] - b.attributes[2];
    else if (sorting.sortBy === "Visual") val = a.attributes[3] - b.attributes[3];
    else if (sorting.sortBy === "Sound") val = a.attributes[4] - b.attributes[4];
    else if (sorting.sortBy === "Price") val = a.price - b.price;
    else if (sorting.sortBy === "Value")
        val = a.totalMagimins / a.price - b.totalMagimins / b.price;

    if (sorting.sortDir === "asc") return val;
    else return val * -1;
};

const IngredientGrid = ({ filters }: { filters?: IngredientFilters }): JSX.Element => {
    const [sorting, setSorting] = useState<IngredientSorting>({
        sortBy: undefined,
        sortDir: undefined,
    });

    return (
        <div className="flex flex-col pt-8">
            <IngredientHeader value={sorting} onChange={setSorting} />
            {ingredients
                .sort((a, b) => sortIngredient(a, b, sorting))
                .map(i => (
                    <IngredientRow
                        ingredient={i}
                        key={i.name}
                        hidden={!filterIngredient(i, filters)}
                    />
                ))}
        </div>
    );
};

export default IngredientGrid;
