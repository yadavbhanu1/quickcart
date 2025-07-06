'use client';
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
          <p>Looks like you haven't placed any orders yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <h1 className="text-3xl font-semibold mb-10">My Orders</h1>
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div key={index} className="border rounded p-6 shadow-sm">
              <div className="mb-4 flex justify-between">
                <p className="font-medium">Order Date: {new Date(order.date).toLocaleString()}</p>
                <p className="font-medium">Total: ${order.amount.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{order.address.fullName}</p>
                <p>{order.address.area}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>Phone: {order.address.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
