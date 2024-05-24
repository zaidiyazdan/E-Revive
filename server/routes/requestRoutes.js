import express from "express"
const router=express.Router()
import pool from "../database.js";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Erevie',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ['jpeg', 'png', 'jpg'].includes(ext) ? ext : 'jpg';
    },
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
  },
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Express route for image upload
router.post('/create-request', upload.single('file'), async (req, res) => {
  const { name, type, price, weight, userId, facilityId } = req.body;
  console.log(name, type, price, weight);

  try {
    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = req.file.path;
    const publicId = req.file.filename;
    const resizedUrl = cloudinary.url(publicId, {
      width: 400,
      height: 300,
      crop: 'fill',
    });

    console.log({ imageUrl, resizedUrl });

    const [ewasteResult] = await pool.query(
      'INSERT INTO ewaste (name, type, price, weight, image) VALUES (?, ?, ?, ?, ?)',
      [name, type, price, weight, resizedUrl]
    );

    const ewasteId = ewasteResult.insertId;

    // Insert request data into the database
    const [requestResult] = await pool.query(
      'INSERT INTO requests (ewate_id, user_id, fac_id) VALUES (?, ?, ?)',
      [ewasteId, userId, facilityId]
    );

    const requestId = requestResult.insertId;

    // Retrieve the newly created request
    const [request] = await pool.query('SELECT * FROM requests WHERE req_id = ?', [
      requestId,
    ]);

    res.status(201).send({
      message: 'Request accepted successfully',
      data: request,
    });

    console.log(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});


import {createRequest,acceptRequest,rejectRequest,getAllRequests,getAllreq,completeTransaction} from "../controllers/requestControllers.js"

// Request banane ke lie
// router.post('/create-request',uploadCloud.single('file'),createRequest);

// request accept karne ke lie
router.get('/completetransaction/:requestId',acceptRequest);

// Perticular request reject karne ke lia
router.patch('/rejectrequest/:requestId',rejectRequest);

// Facility ko saari request show karne ke lie.
router.get('/getallrequests/:facilityId',getAllRequests);

router.get('/allpastrequest/:facilityId',getAllreq)

router.put('/completeTransaction',completeTransaction);

export default router;