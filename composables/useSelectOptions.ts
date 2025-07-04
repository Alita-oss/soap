export const useSelectOptions = () => {
    const generateSelectOptionsFromEnum = <T>(
        optionsEnum: Record<string, any>,
        formatText = true,
    ): { value: T; text: string }[] => {
        return Object.values(optionsEnum).map((value) => ({
            value,
            text: formatText ? formatOptionText(value) : value,
        }));
    };

    const formatOptionText = (value: string) =>
        value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase());

    return { generateSelectOptionsFromEnum };
};
