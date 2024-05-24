import pool from "../database.js";
import transporter from "../utility/sendMail.js";


// create request mai hi product aur request dono mai data daalna hoga.
// create request user banaiga.

export const createRequest = async function(req, res) {
    const { name, type, price, weight, userId, facilityId } = req.body;
    console.log(name, type, price, weight);
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const imageUrl = req.file.path;
      const publicId = req.file.public_id;
      const resizedUrl = cloudinary.url(publicId, {
        width: 400,
        height: 300,
        crop: 'fill',
      });
  
      console.log({ imageUrl: imageUrl, resizedUrl: resizedUrl });
  
      const [ewasteResult] = await pool.query(
        'INSERT INTO ewaste (name, type, price, weight) VALUES (?, ?, ?, ?)',
        [name, type, price, weight]
      );
  
      const ewasteId = ewasteResult.insertId;
  
      const [request] = await pool.query(
        'INSERT INTO requests (ewate_id, user_id, fac_id) VALUES (?, ?, ?)',
        [ewasteId, userId, facilityId]
      );
  
      const [req] = await pool.query('SELECT * FROM requests WHERE req_id=?', [
        request.insertId,
      ]);
  
      res.status(201).send({
        message: 'Request accepted successfully',
        data: req,
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      res.status(500).send({ message: 'An error occurred while accepting request' });
    }
  };

// create acceptRequest mai user,facility,product ka transaction banega
// appectRequest is used by the facility. 

export const acceptRequest = async function(req, res) { 
    const requestId = req.params.requestId;
    try {
        // request ka status change kar do
        await pool.query('UPDATE requests SET status = ? WHERE req_id = ?', ['ACCEPTED', requestId]);
        const info = await pool.query('SELECT u.address as userAddress,u.email as userEmail,u.phone as userPhone,f.* FROM users u,requests r JOIN facilities f ON r.fac_id =  f.f_id WHERE u.user_id = r.user_id AND r.req_id=?',[requestId]);
        const [dataObject] = info[0]
        console.log(info);
        transporter.verify(function(error, success) {
            if (error) {
              console.error(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
          
        const mailOptions = {
            from: 'aliyazda64@gmail.com',
            to: dataObject.userEmail,
            subject: 'Facility Accepted your Request!',
            text: `Facility ${dataObject.name} in ${dataObject.address} having a capacity ${dataObject.capacity} accepted your E waste Request. Call ${dataObject.phone} to cantact Facility.`,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const [req] = await pool.query('SELECT * FROM requests WHERE req_id=?',[requestId]);

        res.status(200).send({ message: 'Request accepted successfully', request: req });
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).send({ message: 'An error occurred while accepting request' });
    }
};


export const rejectRequest = async function(req, res) { 
    const requestId = req.params.requestId;
    try {
        // request ka status change kar do
        await pool.query('UPDATE requests SET status = ? WHERE req_id = ?', ['REJECTED', requestId]);
        
        const info = await pool.query('SELECT u.address as userAddress,u.email as userEmail,u.phone as userPhone,f.* FROM users u,requests r JOIN facilities f ON r.fac_id =  f.f_id WHERE u.user_id = r.user_id AND r.req_id=?',[requestId]);
        const [dataObject] = info[0]
        console.log(info);
        transporter.verify(function(error, success) {
            if (error) {
              console.error(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
          
        const mailOptions = {
            from: 'aliyazda64@gmail.com',
            to: dataObject.userEmail,
            subject: 'Facility Rejected your Request!',
            text: `Sorry, Facility ${dataObject.name} in ${dataObject.address} having a capacity ${dataObject.capacity} rejected  your E waste Request. Call ${dataObject.phone} to cantact Facility.`,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).send({ message: 'Request Rejected successfully'});
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).send({ message: 'An error occurred while rejecting request' });
    }
};

export async function getAllRequests(req, res) {
    const { facilityId } = req.params;
    try {
        const [requests] = await pool.query(`
            SELECT
                r.req_id,
                r.status,
                r.ewate_id,
                r.user_id,
                r.fac_id,
                r.created_at,
                e.image,
                e.name AS ewaste_name,
                e.type AS ewaste_type,
                e.price AS ewaste_price,
                e.weight AS ewaste_weight
            FROM
                requests r
            JOIN
                ewaste e ON r.ewate_id = e.waste_id
            WHERE
                r.fac_id = ? AND r.status = 'PENDING'
        `, facilityId);
       
        console.log(requests);
        res.status(201).send({ message: 'Request fetched successfully', data: requests });
    } catch (error) {
        console.error('Error getting requests', error);
        res.status(500).send({ message: 'An error occurred while getting requests' });
   }
}


// export async function getAccepted(req, res) {
//     const { facilityId } = req.params;
//     try {
//         const [requests] = await pool.query(`
//             SELECT
//                 r.req_id,
//                 r.status,
//                 r.ewate_id,
//                 r.user_id,
//                 r.fac_id,
//                 r.created_at,
//                 e.name AS ewaste_name,
//                 e.type AS ewaste_type,
//                 e.price AS ewaste_price,
//                 e.weight AS ewaste_weight
//             FROM
//                 requests r
//             JOIN
//                 ewaste e ON r.ewate_id = e.waste_id
//             WHERE
//                 r.fac_id = ? AND r.status = 'ACCEPTED'
//         `, facilityId);
    
//         console.log(requests);
//         res.status(201).send({ message: 'Request fetched successfully', data: requests });
//     } catch (error) {
//         console.error('Error getting requests', error);
//         res.status(500).send({ message: 'An error occurred while getting requests' });
//   }
// }

export async function getAllreq(req, res) {
    const { facilityId } = req.params;
    console.log(facilityId);
    try {
        const [requests] = await pool.query(`
            SELECT
                r.req_id,
                r.status,
                r.ewate_id,
                r.user_id,
                r.fac_id,
                r.created_at,
                e.name AS ewaste_name,
                e.type AS ewaste_type,
                e.price AS ewaste_price,
                e.weight AS ewaste_weight
            FROM
                requests r
            JOIN
                ewaste e ON r.ewate_id = e.waste_id
            WHERE
                r.fac_id = ?
        `, facilityId);
       
        console.log(requests);
        res.status(201).send({ message: 'Request fetched successfully', data: requests });
    } catch (error) {
        console.error('Error getting requests', error);
        res.status(500).send({ message: 'An error occurred while getting requests' });
    }
}

export const completeTransaction = async function(req, res) { 
    const requestId = req.params.requestId;
    try {
        // request ka status change kar do
        await pool.query('UPDATE requests SET status = ? WHERE req_id = ?', ['COMPLETED', requestId]);

        // request ki details le lo jo transaction mai dalegi
        const [requestResult] = await pool.query('SELECT * FROM requests WHERE req_id = ?', [requestId]);
        const request = requestResult[0];

        // transaction bna do.
        const transactionDetails = await pool.query('INSERT INTO transactions (fac_id, user_id, waste_id, tran_date) VALUES (?, ?, ?, ?)', [request.fac_id, request.user_id, request.ewate_id, new Date()]);

        const [req] = await pool.query('SELECT * FROM requests WHERE req_id=?',[requestId]);

        res.status(200).send({ message: 'Request accepted successfully', request: req });
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).send({ message: 'An error occurred while accepting request' });
    }
};