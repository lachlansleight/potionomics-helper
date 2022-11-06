import AttributeImage from "./AttributeImage";

export type FilterStatus = "exclude" | "neutral" | "include";
export interface IngredientFilters {
    magimins: boolean[];
    magiminAll: boolean;
    magiminExclusive: boolean;
    magiminFactor: number;
    magiminFactorAll: boolean;
    attributes: boolean[];
    attributeAll: boolean;
    attributeExclusive: boolean;
    phase: number;
    phaseExact: boolean;
}

const IngredientFilterControls = ({
    value,
    onChange,
}: {
    value: IngredientFilters;
    onChange: (val: IngredientFilters) => void;
}): JSX.Element => {
    return (
        <div className="flex flex-col w-72 gap-2 select-none border-r border-white border-opacity-50 px-6 mt-20">
            <h2 className="text-2xl text-center">Magimins</h2>
            <div className="grid grid-cols-5 gap-2">
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-red-800 bg-red-800 w-8 h-8 grid place-items-center text-xl ${
                        value.magimins[0] ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [!value.magimins[0], ...value.magimins.slice(1)],
                        })
                    }
                >
                    A
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-green-800 bg-green-800 w-8 h-8 grid place-items-center text-xl ${
                        value.magimins[1] ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [
                                ...value.magimins.slice(0, 1),
                                !value.magimins[1],
                                ...value.magimins.slice(2, 5),
                            ],
                        })
                    }
                >
                    B
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-yellow-800 bg-yellow-800 w-8 h-8 grid place-items-center text-xl ${
                        value.magimins[2] ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [
                                ...value.magimins.slice(0, 2),
                                !value.magimins[2],
                                ...value.magimins.slice(3, 5),
                            ],
                        })
                    }
                >
                    C
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-blue-800 bg-blue-800 w-8 h-8 grid place-items-center text-xl ${
                        value.magimins[3] ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [
                                ...value.magimins.slice(0, 3),
                                !value.magimins[3],
                                ...value.magimins.slice(4, 5),
                            ],
                        })
                    }
                >
                    D
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-purple-800 bg-purple-800 w-8 h-8 grid place-items-center text-xl ${
                        value.magimins[4] ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [...value.magimins.slice(0, 4), !value.magimins[4]],
                        })
                    }
                >
                    E
                </div>
            </div>
            <div className="flex justify-between">
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.magiminAll ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, magiminAll: !value.magiminAll })}
                    title="If enabled, ingredients must contain all the selected magimins to be included. In-game, this is enabled."
                >
                    ALL
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.magiminExclusive ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({ ...value, magiminExclusive: !value.magiminExclusive })
                    }
                    title="If enabled, ingredients containing magimins that aren't selected will be excluded. In-game, this is disabled."
                >
                    ONLY
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center`}
                    onClick={() =>
                        onChange({
                            ...value,
                            magimins: [false, false, false, false, false],
                            magiminAll: true,
                            magiminExclusive: false,
                        })
                    }
                    title="Reset to the default in-game state."
                >
                    RESET
                </div>
            </div>

            <h2 className="text-2xl text-center mt-8">Magimin Factors</h2>
            <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 6, 8, 10, 11, 12, 16, 18, 20, 22, 24, 28].map(i => (
                    <div
                        key={`factor-${i}`}
                        className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                            value.magiminFactor === i ? "" : "bg-opacity-0"
                        }`}
                        onClick={() => onChange({ ...value, magiminFactor: i })}
                        title={i === 1 ? "Allow all magimin values" : `Magimin value must be divisible by ${i}`}
                    >
                        {i}
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-6">
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.magiminFactorAll ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({ ...value, magiminFactorAll: !value.magiminFactorAll })
                    }
                    title="If enabled, all magimins must be divisible by the selected factor to be included (rather than just the total)."
                >
                    ALL
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center`}
                    onClick={() => onChange({ ...value, magiminFactor: 1 })}
                    title="Reset to the default in-game state."
                >
                    RESET
                </div>
            </div>

            <h2 className="text-2xl text-center mt-8">Attributes</h2>
            <div className="grid grid-cols-5 gap-2">
                <AttributeImage
                    attribute="Taste"
                    value={value.attributes[0] ? 1 : 0}
                    className="w-8 h-8 cursor-pointer select-none"
                    style={{ opacity: "100%" }}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [!value.attributes[0], ...value.attributes.slice(1)],
                        })
                    }
                />
                <AttributeImage
                    attribute="Sensation"
                    value={value.attributes[1] ? 1 : 0}
                    className="w-8 h-8 cursor-pointer select-none"
                    style={{ opacity: "100%" }}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [
                                ...value.attributes.slice(0, 1),
                                !value.attributes[1],
                                ...value.attributes.slice(2, 5),
                            ],
                        })
                    }
                />
                <AttributeImage
                    attribute="Aroma"
                    value={value.attributes[2] ? 1 : 0}
                    className="w-8 h-8 cursor-pointer select-none"
                    style={{ opacity: "100%" }}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [
                                ...value.attributes.slice(0, 2),
                                !value.attributes[2],
                                ...value.attributes.slice(3, 5),
                            ],
                        })
                    }
                />
                <AttributeImage
                    attribute="Visual"
                    value={value.attributes[3] ? 1 : 0}
                    className="w-8 h-8 cursor-pointer select-none"
                    style={{ opacity: "100%" }}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [
                                ...value.attributes.slice(0, 3),
                                !value.attributes[3],
                                ...value.attributes.slice(4, 5),
                            ],
                        })
                    }
                />
                <AttributeImage
                    attribute="Sound"
                    value={value.attributes[4] ? 1 : 0}
                    className="w-8 h-8 cursor-pointer select-none"
                    style={{ opacity: "100%" }}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [...value.attributes.slice(0, 4), !value.attributes[4]],
                        })
                    }
                />
            </div>
            <div className="flex justify-between">
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.attributeAll ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, attributeAll: !value.attributeAll })}
                    title="If enabled, ingredients must have all the selected positive attributes to be included."
                >
                    ALL
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.attributeExclusive ? "" : "bg-opacity-0"
                    }`}
                    onClick={() =>
                        onChange({ ...value, attributeExclusive: !value.attributeExclusive })
                    }
                    title="If enabled, ingredients containing other negative attributes will be excluded."
                >
                    ONLY
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center`}
                    onClick={() =>
                        onChange({
                            ...value,
                            attributes: [false, false, false, false, false],
                            attributeAll: true,
                            attributeExclusive: false,
                        })
                    }
                    title="Reset to the default in-game state."
                >
                    RESET
                </div>
            </div>

            <h2 className="text-2xl text-center mt-8">Week</h2>
            <div className="grid grid-cols-5 gap-2">
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                        value.phase === 1 ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phase: 1 })}
                >
                    1
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                        value.phase === 2 ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phase: 2 })}
                >
                    2
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                        value.phase === 3 ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phase: 3 })}
                >
                    3
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                        value.phase === 4 ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phase: 4 })}
                >
                    4
                </div>
                <div
                    className={`cursor-pointer select-none rounded-md border-2 border-neutral-500 bg-neutral-500 w-8 h-8 grid place-items-center text-xl ${
                        value.phase === 5 ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phase: 5 })}
                >
                    5
                </div>
            </div>
            <div className="flex justify-center gap-6">
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center ${
                        value.phaseExact ? "" : "bg-opacity-0"
                    }`}
                    onClick={() => onChange({ ...value, phaseExact: !value.phaseExact })}
                    title="If enabled, only ingredients that are newly available in the selected week will be included."
                >
                    ONLY
                </div>
                <div
                    className={`cursor-pointer select-none rounded border-2 border-green-800 bg-green-800 text-xl w-16 text-center`}
                    onClick={() => onChange({ ...value, phase: 5, phaseExact: false })}
                    title="Reset to the default in-game state."
                >
                    RESET
                </div>
            </div>
        </div>
    );
};

export default IngredientFilterControls;
