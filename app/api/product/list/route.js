import Product from "@/models/Product"
import connectDB from "@/config/db"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
     

    // Connect to DB
    await connectDB()

    // Fetch seller's products only (optional: filter by userId)
    // Agar sab products chahiye to remove filter
    const products = await Product.find({  })

    return NextResponse.json({ success: true, products })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}
