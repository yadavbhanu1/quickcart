let orders = [];

export default function handler(req, res) {
  console.log("API hit:", req.method, req.body); // 📝 debug log
  if (req.method === 'POST') {
    const newOrder = req.body;
    orders.push(newOrder);
    return res.status(201).json({ message: 'Order saved', order: newOrder });
  }
  if (req.method === 'GET') {
    return res.status(200).json({ orders });
  }
  res.status(405).json({ message: 'Method not allowed' });
}
