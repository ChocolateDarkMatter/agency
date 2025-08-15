import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
}

// Configuration with validation
const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Cloudinary configuration incomplete. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export const fetchGalleryImages = async (folder?: string): Promise<CloudinaryImage[]> => {
  try {
    // Check if Cloudinary is properly configured
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Cloudinary configuration incomplete. Cannot fetch images.');
      return [];
    }

    const searchFolder = folder || import.meta.env.CLOUDINARY_FOLDER || '';
    
    const result = await cloudinary.search
      .expression(searchFolder ? `folder:${searchFolder}` : 'resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    return result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      resource_type: resource.resource_type,
      created_at: resource.created_at,
    }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
};

export const generateImageUrl = (
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  }
) => {
  if (!cloudName) {
    console.error('CLOUDINARY_CLOUD_NAME not configured. Cannot generate image URL.');
    return '';
  }

  const transformation = [];
  
  if (transformations?.width) transformation.push(`w_${transformations.width}`);
  if (transformations?.height) transformation.push(`h_${transformations.height}`);
  if (transformations?.crop) transformation.push(`c_${transformations.crop}`);
  if (transformations?.quality) transformation.push(`q_${transformations.quality}`);
  if (transformations?.format) transformation.push(`f_${transformations.format}`);
  
  const transformString = transformation.length > 0 ? `/${transformation.join(',')}` : '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload${transformString}/${publicId}`;
};