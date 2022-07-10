import Post from "../models/post";
import cloudinary from 'cloudinary';
import User from '../models/user';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


export const uploadImage = async (req, res) => {

  try{
    const result = await cloudinary.uploader.upload(req.files.image.path);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (err) {
    console.log(err);
  }

};

export const uploadVideo = async (req, res) => {

    try{
      const result = await cloudinary.uploader.upload(req.files.image.path);
      res.json({
        url: result.secure_url,
        public_id: result.public_id,
      })
    } catch (err) {
      console.log(err);
    }
  
  };


export const deleteImage = async (req, res) => {
  try{
    const post = await Post.findByIdAndDelete(req.params._id);
    if(post.image && post.image.public_id) {
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    res.json({ok:true});
  } catch (err) {
    console.log(err)
  }
};

export const deleteVideo = async (req, res) => {
    try{
      const post = await Post.findByIdAndDelete(req.params._id);
      if(post.video && post.video.public_id) {
        const video = await cloudinary.uploader.destroy(post.video.public_id);
      }
      res.json({ok:true});
    } catch (err) {
      console.log(err)
    }
  };