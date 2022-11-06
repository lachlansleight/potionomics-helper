import { useState } from "react";
import IngredientFilterControls, { IngredientFilters } from "components/IngredientFilter";
import IngredientGrid from "components/IngredientGrid";
import Layout from "components/layout/Layout";

const HomePage = (): JSX.Element => {
    const [ingredientFilters, setIngredientFilters] = useState<IngredientFilters>({
        magimins: [false, false, false, false, false],
        magiminAll: true,
        magiminExclusive: false,
        magiminFactor: 1,
        magiminFactorAll: false,
        attributes: [false, false, false, false, false],
        attributeAll: true,
        attributeExclusive: false,
        phase: 5,
        phaseExact: false,
    });

    return (
        <Layout>
            <div className="flex gap-4">
                <IngredientFilterControls
                    value={ingredientFilters}
                    onChange={setIngredientFilters}
                />
                <IngredientGrid filters={ingredientFilters} />
            </div>
        </Layout>
    );
};

export default HomePage;

/*
//Leaving this here so that I don't have to keep looking up the syntax...
import { GetServerSidePropsContext } from "next/types";
export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: any }> {
    return {
        props: {  },
    };
}
*/
