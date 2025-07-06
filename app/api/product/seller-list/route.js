{/*import  products  from "@/assets/productData"
import connectDB from "@/config/db"
import authSeller from "@/lib/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request){
    try{

        const { userId } = getAuth(request)

        const isSeller = authSeller(userId)

        if (!isSeller){
            return NextResponse.json({success: false,message: "not authorized"});
        }

        await connectDB()

        const products = await Product.find({})
        return NextResponse.json({ success:true,products })

    } catch (error){
      return NextResponse.json({ success: false, message: error.message })
    }
    
}*/}
import Product from "@/models/Product"
import connectDB from "@/config/db"
import authSeller from "@/lib/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    // Authenticate user from request
    const { userId } = getAuth(request)

    // Check if user is seller
    const isSeller = await authSeller(userId)
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not authorized" })
    }

    // Connect to DB
    await connectDB()

    // Fetch seller's products only (optional: filter by userId)
    // Agar sab products chahiye to remove filter
    const products = await Product.find({ userId })

    return NextResponse.json({ success: true, products })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}
