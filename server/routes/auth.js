import express from "express";

const router = express.Router();
//middlewares
import { requireSignin} from "../middlewares";
//controllers
import {register, login, currentUser} from "../controllers/auth";


router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser);


module.exports = router;