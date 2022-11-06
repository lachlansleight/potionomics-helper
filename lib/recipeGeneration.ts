import { gamePhases, ingredients } from "./data";
import { Cauldron, Ingredient, PotionRank, PotionRecipe } from "./types";

export type PotionEvaluation = {
    magimins: number[];
    proportions: number[];
    attributes: number[];
    totalMagimins: number;
};

const stars = [
    0, 10, 30, 40, 50, 60, 75, 105, 115, 130, 150, 170, 215, 235, 260, 290, 315, 370, 400, 430, 470,
    505, 580, 620, 660, 720, 800, 960, 1040, 1125,
];
const ranks: PotionRank[] = ["Minor", "Common", "Greater", "Grand", "Superior", "Masterwork"];
export const getPotionQuality = (
    magimins: number
): {
    rank: PotionRank;
    stars: number;
} => {
    if (magimins <= 0) return { rank: "Common", stars: 0 };

    for (let i = 0; i < stars.length; i++) {
        if (magimins > stars[i]) continue;
        return {
            rank: ranks[Math.floor((i - 1) / 5)],
            stars: (i - 1) % 5,
        };
    }

    return { rank: "Masterwork", stars: 5 };
};

export const evaluateIngredients = (ingredients: Ingredient[]): PotionEvaluation => {
    const magimins = [0, 0, 0, 0, 0];
    const proportions = [0, 0, 0, 0, 0];
    const attributes = [0, 0, 0, 0, 0];
    let totalMagimins = 0;
    for (let i = 0; i < ingredients.length; i++) {
        for (let m = 0; m < 5; m++) {
            totalMagimins += ingredients[i].magimins[m];
            magimins[m] += ingredients[i].magimins[m];
            attributes[m] += ingredients[i].attributes[m];
        }
    }
    for (let m = 0; m < 5; m++) {
        proportions[m] = magimins[m] / totalMagimins;
    }

    return {
        magimins,
        proportions,
        attributes,
        totalMagimins,
    };
};

export const getStability = (recipe: PotionRecipe, potion: PotionEvaluation) => {
    const biggestOffset = Math.max(
        ...recipe.proportions.map((m, i) => Math.abs(m - potion.proportions[i]))
    );

    //these values are correct to within 0.0001%, determined through in-game experimentation
    //0%, 5%, 15% and 25%, each with 0.25% added for some reason
    if (biggestOffset < 0.0025) return 4; //perfect
    if (biggestOffset < 0.0525) return 3; //very stable
    if (biggestOffset < 0.1525) return 2; //stable
    if (biggestOffset < 0.2525) return 1; //unstable
    return 0; //not brewable)
};

export const generateRecipe = (
    recipe: PotionRecipe,
    cauldron: Cauldron,
    gamePhase = 5
): Ingredient[] => {
    if (gamePhase < 0) gamePhase = 0;
    if (gamePhase > 5) gamePhase = 5;

    //filter out ingredients that are unavailable, too powerful for this cauldron, or don't match the desired recipe
    const ings = ingredients.filter(i => {
        if (!gamePhases[gamePhase].includes(i.location)) return false;
        if (i.totalMagimins > cauldron.maxMagimins) return false;
        for (let m = 0; m < 5; m++) {
            if (recipe.magimins[m] === 0 && i.magimins[m] > 0) return false;
        }
        return true;
    });

    const bestRecipe: Ingredient[] = [];
    for (let i = 0; i < cauldron.maxIngredients; i++) {
        bestRecipe.push(ings[0]);
    }

    //todo:
    //brute forcing this is actually not super straightforward haha...
    //need to detect duplicates, terminate branches early to save compute, etc.
    //almost like writing a chess bot or something jeez

    return bestRecipe;
};
