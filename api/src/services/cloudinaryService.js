import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinarySignature = async () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = {
    timestamp,
    upload_preset: 'bioraiz_unsigned', // Preset sin firma (más seguro para cliente)
  };

  // Para cliente unsigned upload (recomendado)
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    upload_preset: 'bioraiz_unsigned',
    timestamp,
  };
};

export const validateCloudinaryUrl = (url) => {
  // Valida que la URL sea de Cloudinary y pertenezca a nuestra cuenta
  if (!url || typeof url !== 'string') return false;
  return url.includes('res.cloudinary.com') && url.includes(process.env.CLOUDINARY_CLOUD_NAME);
};

export default cloudinary;
