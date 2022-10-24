const cloudinary = require("cloudinary").v2;

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_APIKEY,
   api_secret: process.env.CLOUDINARY_APISECRET,
   secure: true
})



deleteImage = async (publicId) => {
   return await cloudinary.uploader.destroy(publicId)
}

module.exports = {

}
