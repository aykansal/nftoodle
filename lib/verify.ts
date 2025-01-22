export const verifyValidImages = async (imageUrls: string[]) => {
    const validTokens: string[] = [];
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
        }
    }
    return validTokens;
}