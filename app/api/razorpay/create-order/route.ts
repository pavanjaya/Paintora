import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return Response.json({ error: 'Razorpay not configured' }, { status: 503 })
  }

  try {
    const { userId } = await request.json()
    if (!userId) return Response.json({ error: 'userId required' }, { status: 400 })

    const Razorpay = (await import('razorpay')).default
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: 19900,
      currency: 'INR',
      notes: { user_id: userId },
    })

    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Razorpay create-order error:', err)
    return Response.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
