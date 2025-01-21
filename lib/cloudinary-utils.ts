import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  error?: string;
}

export async function uploadToCloudinary(
  file: File | string,
  folder = 'nftoodle'
): Promise<CloudinaryUploadResponse> {
  try {
    if (typeof file === 'string') {
      // Upload from URL
      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: 'auto',
      });
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } else {
      // Upload from File object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      secure_url: '',
      public_id: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}

export function getCloudinaryUrl(publicId: string, transforms: string = ''): string {
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${transforms}/${publicId}`;
}