import express from "express";
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { requireSignin, canEditDeletePost, isAdmin  } from "../middlewares";
// controllers
import { createPost, uploadImage, deletePost, posts} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.post("/upload-image", requireSignin, formidable({maxFileSize: 5 * 1024 * 1024}), uploadImage );

router.delete('/delete-post/:_id',requireSignin, canEditDeletePost, deletePost);

router.get('/posts', posts);


module.exports = router;