import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const requestCloudinary = async (img: string) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(img, {
            folder: "/LiveCodex/users"
        })
        return uploadResponse
    } catch (error) {
        throw new Error(String(error))
    }

}