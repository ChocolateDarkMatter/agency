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

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const fetchGalleryImages = async (folder?: string): Promise<CloudinaryImage[]> => {
  try {
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
  const transformation = [];
  
  if (transformations?.width) transformation.push(`w_${transformations.width}`);
  if (transformations?.height) transformation.push(`h_${transformations.height}`);
  if (transformations?.crop) transformation.push(`c_${transformations.crop}`);
  if (transformations?.quality) transformation.push(`q_${transformations.quality}`);
  if (transformations?.format) transformation.push(`f_${transformations.format}`);
  
  const transformString = transformation.length > 0 ? `/${transformation.join(',')}` : '';
  
  return `https://res.cloudinary.com/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/upload${transformString}/${publicId}`;
};