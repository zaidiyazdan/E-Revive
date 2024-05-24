import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: 'dkrdyeox4',
    api_key: '662213534891489',
    api_secret: '2kgWbik1WCpMeRujbTkrzUmGhNk'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'E-revive',
      format: async (req, file) => {
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
          return 'jpg';
        } else if (fileExtension === 'png') {
          return 'png';
        } else if (fileExtension === 'gif') {
          return 'gif';
        } else if (fileExtension === 'tif' || fileExtension === 'tiff') {
          return 'tiff';
        }
        return fileExtension;
      },
      public_id: (req, file) => 'computed-filename',
    },
  });

export const uploadCloud = multer({ storage: storage });