

import { pusher } from "@/lib/pusher/pusher"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest, response: NextApiResponse) {
    try {

        const {
            message,
            username,
            room
        } = await request.json()
        await pusher.trigger(room, "new-message", {
            message,
            username,
        });
        return NextResponse.json({
            message: "message is update",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}