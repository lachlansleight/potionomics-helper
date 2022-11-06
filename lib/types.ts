export interface Cauldron {
    icon: string;
    name: string;
    price: number;
    maxIngredients: number;
    maxMagimins: number;
    unlockDay: number;
}

export interface Ingredient {
    name: string;
    rarity: number;
    type: IngredientType;
    totalMagimins: number;
    magimins: number[];
    attributes: number[];
    price: number;
    location: IngredientLocation;
    defaultSortOrder: number;
}

export interface PotionRecipe {
    name: string;
    magimins: number[];
    proportions: number[];
    potions: Potion[];
}

export interface Potion {
    icon: string;
    rank: PotionRank;
    effect: string;
    description: string;
}

export type AttributeType = "Taste" | "Sensation" | "Aroma" | "Visual" | "Sound";
export type IngredientType =
    | "Flower"
    | "Fungus"
    | "Bug"
    | "Fruit"
    | "Plant"
    | "Slime"
    | "Fish"
    | "Flesh"
    | "Bone"
    | "Mineral"
    | "Essence"
    | "Gem"
    | "Ore"
    | "Pure Mana";
export type IngredientLocation =
    | "Enchanted Forest"
    | "Mushroom Mire"
    | "Bone Wastes"
    | "Storm Plains"
    | "Ocean Coasts"
    | "Shadow Steppe"
    | "Sulfuric Falls"
    | "Ice Craggs"
    | "Crystalline Forest"
    | "Arctic"
    | "Dragon Oasis"
    | "Crater"
    | "Magical Wasteland";
export type PotionRank = "Minor" | "Common" | "Greater" | "Grand" | "Superior" | "Masterwork";
