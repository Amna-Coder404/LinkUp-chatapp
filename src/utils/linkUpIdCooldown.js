// this is for know when we Change our LinkUp ID (it give me next date)
const COOLDOWN_DAYS = 7;

export const getNextLinkUpIdChangeDate = (lastChangedAt) => {
    if (!lastChangedAt) return null;

    const date = new Date(lastChangedAt);

    date.setDate(date.getDate() + COOLDOWN_DAYS);

    return date;
};

export const canChangeLinkUpId = (lastChangedAt) => {
    if (!lastChangedAt) return true;

    const nextChangeDate = getNextLinkUpIdChangeDate(lastChangedAt);

    return new Date() >= nextChangeDate;
};