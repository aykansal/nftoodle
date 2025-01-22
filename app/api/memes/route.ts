import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Function to upload to Cloudinary
const uploadToCloudinary = async ({ imageDataUrl }: { imageDataUrl: string }) => {
    try {
        // Validate that the imageDataUrl is not empty and properly formatted
        if (!imageDataUrl || !imageDataUrl.startsWith("data:image/png;base64,")) {
            throw new Error("Invalid or empty imageDataUrl");
        }

        console.log("\nUploading to Cloudinary...");

        // Upload the image data to Cloudinary
        const uniquePublicId = `nftoodle_${Date.now()}`;
        const result = await new Promise<unknown>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: uniquePublicId,
                    folder: "nftoodle",
                    format: "png",
                    transformation: {
                        quality: "auto",
                        fetch_format: "auto",
                    },
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Convert base64 image data to a buffer and pass it to the upload stream
            const buffer = Buffer.from(imageDataUrl.split(",")[1], "base64");
            uploadStream.end(buffer);
        });

        console.log("\nUpload successful");
        return result;
    } catch (error) {
        console.error("Upload failed", error);
        throw error; // Re-throw the error after logging
    }
};

// API Route to handle upload
export async function POST(req: NextRequest) {
    const { imageDataUrl } = await req.json();

    // Validate input and upload the image
    if (!imageDataUrl) {
        return NextResponse.json({ error: "No image data provided" }, { status: 400 });
    }

    try {
        const res = await uploadToCloudinary({ imageDataUrl });
        console.log(res);
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error during upload", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    const nftMemes = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'nftoodle',
        max_results: 100,
    });
    return NextResponse.json(nftMemes.resources);
}