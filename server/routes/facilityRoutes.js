import express from "express"
const router=express.Router()
import {loginFacility,registerFacility,getAllFacilities} from '../controllers/facilityControllers.js'

router.post("/login",loginFacility);
router.post('/register',registerFacility);

// user ko saari facility show karne ke lie
router.get('/allfacility',getAllFacilities);

export default router;