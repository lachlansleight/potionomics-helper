import cauldronsRaw from "./potionomicsCauldrons.json";
import ingredientsRaw from "./potionomicsIngredients.json";
import potionsRaw from "./potionomicsPotions.json";
import {
    Cauldron,
    Ingredient,
    IngredientLocation,
    IngredientType,
    PotionRank,
    PotionRecipe,
} from "./types";

export const cauldrons: Cauldron[] = cauldronsRaw;
export const ingredients: Ingredient[] = ingredientsRaw.map((raw, i) => {
    const outv: Ingredient = {
        ...raw,
        type: raw.type as IngredientType,
        location: raw.location as IngredientLocation,
        defaultSortOrder: i,
    };
    return outv;
});

const mapPotionRaw = (raw: {
    name: string;
    recipe: number[];
    potions: {
        icon: string;
        rank: string;
        effect: string;
        description: string;
    }[];
}): PotionRecipe => {
    const outv: PotionRecipe = {
        ...raw,
        magimins: raw.recipe,
        proportions: raw.recipe.map(m => m / raw.recipe.reduce((a, b) => a + b, 0)),
        potions: raw.potions.map(p => ({
            ...p,
            rank: p.rank as PotionRank,
        })),
    };
    return outv;
};

export const potions = {
    health: mapPotionRaw(potionsRaw.health),
    mana: mapPotionRaw(potionsRaw.mana),
    stamina: mapPotionRaw(potionsRaw.stamina),
    speed: mapPotionRaw(potionsRaw.speed),
    tolerance: mapPotionRaw(potionsRaw.tolerance),
    fire: mapPotionRaw(potionsRaw.fire),
    ice: mapPotionRaw(potionsRaw.ice),
    thunder: mapPotionRaw(potionsRaw.thunder),
    shadow: mapPotionRaw(potionsRaw.shadow),
    radiation: mapPotionRaw(potionsRaw.radiation),
    sight: mapPotionRaw(potionsRaw.sight),
    alertness: mapPotionRaw(potionsRaw.alertness),
    insight: mapPotionRaw(potionsRaw.insight),
    dowsing: mapPotionRaw(potionsRaw.dowsing),
    seeking: mapPotionRaw(potionsRaw.seeking),
    poison: mapPotionRaw(potionsRaw.poison),
    drowsiness: mapPotionRaw(potionsRaw.drowsiness),
    petrification: mapPotionRaw(potionsRaw.petrification),
    silence: mapPotionRaw(potionsRaw.silence),
    curse: mapPotionRaw(potionsRaw.curse),
};

export const gamePhases: IngredientLocation[][] = [
    //["Enchanted Forest"], //commented out because this is just the only one during the tutorial...not really a full game week
    ["Enchanted Forest", "Mushroom Mire", "Bone Wastes"],
    [
        "Enchanted Forest",
        "Mushroom Mire",
        "Bone Wastes",
        "Storm Plains",
        "Ocean Coasts",
        "Shadow Steppe",
    ],
    [
        "Enchanted Forest",
        "Mushroom Mire",
        "Bone Wastes",
        "Storm Plains",
        "Ocean Coasts",
        "Shadow Steppe",
        "Sulfuric Falls",
        "Ice Craggs",
        "Crystalline Forest",
    ],
    [
        "Enchanted Forest",
        "Mushroom Mire",
        "Bone Wastes",
        "Storm Plains",
        "Ocean Coasts",
        "Shadow Steppe",
        "Sulfuric Falls",
        "Ice Craggs",
        "Crystalline Forest",
        "Arctic",
        "Dragon Oasis",
        "Crater",
    ],
    [
        "Enchanted Forest",
        "Mushroom Mire",
        "Bone Wastes",
        "Storm Plains",
        "Ocean Coasts",
        "Shadow Steppe",
        "Sulfuric Falls",
        "Ice Craggs",
        "Crystalline Forest",
        "Arctic",
        "Dragon Oasis",
        "Crater",
        "Magical Wasteland",
    ],
];
