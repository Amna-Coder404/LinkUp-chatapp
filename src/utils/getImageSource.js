const getImageSource = (image) => {
    if (!image) return null;

    const match = image.match(/https?:\/\/[^\s)\]]+/);

    if (!match) return null;

    return {
        uri: match[0],
    };
};

export default getImageSource;