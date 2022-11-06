const LocationIcon = ({
    name,
    className = "",
}: {
    name: string;
    className?: string;
}): JSX.Element => {
    const fileName = name.replace(/ /g, "_").replace(/-/g, "_").replace(/'/g, "");

    return (
        <img className={className} src={`/img/locations/${fileName}.png`} title={name} alt={name} />
    );
};

export default LocationIcon;
