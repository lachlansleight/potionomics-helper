import Layout from "components/layout/Layout";

const HomePage = (): JSX.Element => {
    return (
        <Layout>
            <div className="w-screen h-screen">
                <p>This is a webpage</p>
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
