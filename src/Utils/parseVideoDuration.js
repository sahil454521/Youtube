export const parseVideoDuration = (duration) => {
    if (!duration) return "0:00";

    // Remove "PT" prefix and split into parts
    const durationParts = duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    // Pad numbers less than 10 with leading zero
    const padTime = (num) => parseInt(num) < 10 ? `0${parseInt(num)}` : num;

    // Handle different duration formats
    if (durationParts.length === 3) {
        // Format: hours:minutes:seconds
        return `${durationParts[0]}:${padTime(durationParts[1])}:${padTime(durationParts[2])}`;
    }

    if (durationParts.length === 2) {
        // Format: minutes:seconds
        return `${durationParts[0]}:${padTime(durationParts[1])}`;
    }

    if (durationParts.length === 1) {
        // Format: seconds only
        return `0:${padTime(durationParts[0])}`;
    }

    return "0:00";
}

