{/*import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server"
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const formData = await request.formData()

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');

        const files = formData.get('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'no files uploaded' })
        }

        const result = await Promise.all(
            files.map(async ()=>{
                const arrayBuffer = await files.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve,reject)=>{
                    const stream = cloudinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error,result) =>{
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )
                    stream.end(buffer)
                })
            })
        )

        const image = result.map(result => result.secure_url)

        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image,
            data: Date.now()
        })

        return NextResponse.json({ success: true, message: 'Upload successful', newProduct})

    } catch (error) {
    return NextResponse.json({ success: false, message: error.message })   
    }
}*/}
import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // ✅ User ka Auth
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" });
    }

    // ✅ formData le rahe hain
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    // ✅ Yeh important hai — getAll se sare files array me milenge
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded" });
    }

    // ✅ Cloudinary upload logic
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );

    const imageUrls = uploadedImages.map((result) => result.secure_url);

    // ✅ Database connect + Product create
    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image: imageUrls,
      date: Date.now(), // spelling fix: was "data"
    });

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      newProduct,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
