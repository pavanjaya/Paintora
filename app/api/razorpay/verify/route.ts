import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/subscription'

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await request.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Set subscription active for 30 days
    const currentPeriodEnd = new Date()
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30)

    await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      status: 'active',
      razorpay_payment_id,
      razorpay_order_id,
      current_period_end: currentPeriodEnd.toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Razorpay verify error:', err)
    return Response.json({ error: 'Verification failed' }, { status: 500 })
  }
}
