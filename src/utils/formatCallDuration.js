const formatCallDuration = (startedAt, currentTime = Date.now()) => {
    if (!startedAt) return "00:00";

    const startTime = new Date(startedAt).getTime();
    const totalSeconds = Math.max(
        0,
        Math.floor((currentTime - startTime) / 1000)
    );

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default formatCallDuration;