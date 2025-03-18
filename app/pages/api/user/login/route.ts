import { userSchemaStr } from "@/lib/Schemas/Schema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken"
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request?.json()
        const { email, password } = reqBody
        const findUser = await userSchemaStr.findOne({ email: email })
        if (!findUser) {
            return NextResponse.json({
                message: "Invaild Email",
                success: false
            })

        } else {
            const validPassword = await bcryptjs.compare(password, findUser?.password)
            if (!validPassword) {
                return NextResponse.json({
                    message: "Password incorrect",
                    success: false
                })
            } else {
                const tokenData = {
                    name: findUser?.name,
                    email: findUser?.email,
                    image: findUser?.image,
                }
                const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
                const response = NextResponse?.json({
                    message: "Login successfully",
                    success: true
                })
                response.cookies.set("token", token, { httpOnly: true })
                return response
            }
        }

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}