export const useDate = () => {
    const dateToLocaleString = (date: Date) => {
        return date.toLocaleString();
    };

    return { dateToLocaleString };
};
