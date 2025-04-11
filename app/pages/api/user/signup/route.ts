import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { DBConnection } from "@/lib/DB_Connection/DB_Connection";
import { userSchemaStr } from "@/lib/Schemas/Schema";
import Jwt from "jsonwebtoken";
import { requestCloudinary } from "@/lib/cloudinary/clodinary";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    await DBConnection();
    const reqBody = await request.json();
    const { email, image, name, password } = reqBody;
    // console.log(email, password, name, image)
    const findUser = await userSchemaStr.findOne({ email: email });
    if (findUser) {
      return NextResponse.json({
        message: "User already exist",
        success: false,
      });
    } else {
      const hassedPassword = await bcryptjs.hash(password, 10);
      const imageUplaod = await requestCloudinary(image);
      const response2 = await new userSchemaStr({
        email,
        name,
        password: hassedPassword,
        image: imageUplaod?.secure_url,
      });
      const savedUser = await response2.save();
      const tokenData = {
        id: savedUser?._id,
        email: savedUser?.email,
        image: imageUplaod?.secure_url,
      };
      const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        message: "Register successfully",
        success: true,
      });
      response.cookies.set("token", token, { httpOnly: true });
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      message: "Register successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
