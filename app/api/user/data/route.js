{/*import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        await connectDB()
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found"})
        }
        return NextResponse.json({ success: true, User})
    } catch (error) {
        return NextResponse.json({ success: false, message: "User Not Found"})
    }
}*/}
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();

    // Clerk ID se search karo (not MongoDB _id)
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    return NextResponse.json({ success: true, user }); // user (lowercase U)
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "User Not Found",
    });
  }
}
