

export const getImageSource = (image) => {
    if (!image) return null;

    const match = image.match(/https?:\/\/[^\s)\]]+/);

    if (!match) return null;

    return {
        uri: match[0],
    };
};



// when we have not any image then display there name first letter
export const getProfileInitial = (name) => {
    if (!name?.trim()) return "U";

    const words = name.trim().split(/\s+/);

    return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

