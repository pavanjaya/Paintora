import { NextRequest } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    if (!userId) return Response.json({ error: 'userId required' }, { status: 400 })

    const order = await razorpay.orders.create({
      amount: 19900, // ₹199 in paise
      currency: 'INR',
      notes: { user_id: userId },
    })

    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Razorpay create-order error:', err)
    return Response.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
