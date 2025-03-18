import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isToken: { type: String, required: false }

}, { timestamps: true })
export const userSchemaStr = mongoose.models.users || mongoose.model("users", userSchema)