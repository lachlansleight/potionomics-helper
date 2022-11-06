const IngredientIcon = ({
    name,
    className = "",
}: {
    name: string;
    className?: string;
}): JSX.Element => {
    const fileName = name.replace(/ /g, "_").replace(/-/g, "_").replace(/'/g, "");

    return <img className={className} src={`/img/ings/${fileName}.png`} alt={name} />;
};

export default IngredientIcon;
