import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { DBConnection } from "@/lib/DB_Connection/DB_Connection";
import { userSchemaStr } from "@/lib/Schemas/Schema";

export async function POST(request: NextRequest) {
  try {
    await DBConnection();

    const { currentPassword, newPassword, email } = await request.json();

    // Find user by email
    const user = await userSchemaStr.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Current password is incorrect",
        success: false,
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({
      message: "Password changed successfully",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({
      message: error?.message || "Server error",
      success: false,
    });
  }
}

