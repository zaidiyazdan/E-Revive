import express from "express"
import {loginUser,registerUser,getAllUsers} from '../controllers/usersControllers.js'
const router=express.Router()

router.post("/login",loginUser);
router.post('/register',registerUser);
router.get('/allusers',getAllUsers);

export default router;