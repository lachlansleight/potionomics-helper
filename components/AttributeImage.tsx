import { CSSProperties } from "react";
import { AttributeType } from "lib/types";

const AttributeImage = ({
    attribute,
    value,
    onClick,
    style,
    className = "",
}: {
    attribute: AttributeType;
    value: number;
    style?: CSSProperties;
    onClick?: () => void;
    className?: string;
}): JSX.Element => {
    const getSuffix = (value: number): string =>
        value === 0 ? "neutral" : value > 0 ? "pos" : "neg";

    const getFileName = () => {
        switch (attribute) {
            case "Taste":
                return "img/attrs/taste_" + getSuffix(value) + ".png";
            case "Sensation":
                return "img/attrs/sens_" + getSuffix(value) + ".png";
            case "Aroma":
                return "img/attrs/aroma_" + getSuffix(value) + ".png";
            case "Visual":
                return "img/attrs/vis_" + getSuffix(value) + ".png";
            case "Sound":
                return "img/attrs/sound_" + getSuffix(value) + ".png";
        }
    };

    return (
        <img
            onClick={onClick}
            style={{ opacity: value === 0 ? "30%" : undefined, ...style }}
            src={getFileName()}
            alt={attribute + "-" + getSuffix(value)}
            className={className}
            title={`${value === 0 ? "Neutral" : value > 0 ? "Good" : "Bad"} ${attribute}`}
        />
    );
};

export default AttributeImage;
