'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const OrderSuccess = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="h-[60vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-semibold text-green-600">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mt-4">
            Thank you for shopping with us.
          </p>

          {/* ✅ Go to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded uppercase"
          >
            Go to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
