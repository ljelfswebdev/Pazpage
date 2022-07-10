import express from "express";
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { requireSignin, canEditDeletePost } from "../middlewares";
// controllers
import {  uploadImage, uploadVideo, deleteImage, deleteVideo, posts} from "../controllers/post";

router.post("/upload-image", requireSignin, formidable({maxFileSize: 5 * 1024 * 1024}), uploadImage );
router.post("/upload-video", requireSignin, formidable({maxFileSize: 5 * 1024 * 1024}), uploadVideo );


router.delete('/delete-image/:_id',requireSignin, canEditDeletePost, deleteImage);
router.delete('/delete-video/:_id',requireSignin, canEditDeletePost, deleteVideo);

router.get('/posts', posts);


module.exports = router;