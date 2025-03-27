export const convertRawtoString = (labelValue, isSub = false) => {
    // Handle invalid input
    if (!labelValue) return '0';
    
    // Convert to number and get absolute value
    const num = Math.abs(Number(labelValue));
    
    // Handle non-numeric values
    if (isNaN(num)) return '0';

    // Format based on size
    if (num >= 1.0e9) {
        // Billions: 1500000000 -> 1.5B
        return (num / 1.0e9).toFixed(1) + 'B';
    }
    
    if (num >= 1.0e6) {
        // Millions: 1500000 -> 1.5M
        return (num / 1.0e6).toFixed(1) + 'M';
    }
    
    if (num >= 1.0e3) {
        // Thousands: 1500 -> 1.5K
        return (num / 1.0e3).toFixed(isSub ? 2 : 1) + 'K';
    }

    return num.toString();
}