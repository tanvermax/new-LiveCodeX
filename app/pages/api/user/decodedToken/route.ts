import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken"
export async function GET(request: NextRequest) {
    try {
        const token = await request?.cookies.get("token")?.value || ""
        const decodedValue = await Jwt.decode(token)
        return NextResponse.json({
            message: "Token is decoded",
            success: true,
            token:decodedValue
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}