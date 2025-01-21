export const verifyValidImages = async (imageUrls: string[]) => {
    const validTokens = [];
    for (const url of imageUrls) {
        try {
            const img = new Image();
            img.src = url;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            validTokens.push(url);
        } catch {
            console.warn(`Invalid image URL skipped: ${url}`);
        }
    }
    return validTokens;
}