'use client'

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

type Props = {
  open: boolean
  onClose: () => void
  userId: string
  userEmail?: string
  onSuccess: () => void
}

export default function UpgradeModal({ open, onClose, userId, userEmail, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    // Load Razorpay script
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
    }
  }, [open])

  if (!open) return null

  const handleUpgrade = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const { orderId, amount, currency, error: apiError } = await res.json()
      if (apiError) throw new Error(apiError)

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Paintora',
        description: 'Pro — ₹199/month',
        order_id: orderId,
        prefill: { email: userEmail ?? '' },
        theme: { color: '#1a1a1a' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, userId }),
          })
          const { success } = await verifyRes.json()
          if (success) { onSuccess(); onClose() }
          else setError('Payment verification failed. Contact support.')
        },
        modal: { ondismiss: () => setLoading(false) },
      })
      rzp.open()
    } catch (e) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="upgrade-modal-overlay" onClick={onClose}>
      <div className="upgrade-modal" onClick={e => e.stopPropagation()}>
        <button className="upgrade-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="upgrade-modal-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>

        <h2 className="upgrade-modal-title">Upgrade to Pro</h2>
        <p className="upgrade-modal-sub">Download full-resolution paintings for print, décor, and personal use.</p>

        <div className="upgrade-modal-features">
          <div className="upgrade-modal-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Unlimited downloads, full 4K resolution
          </div>
          <div className="upgrade-modal-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Browse the complete collection
          </div>
          <div className="upgrade-modal-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Save paintings to your collection
          </div>
          <div className="upgrade-modal-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Early access to new drops
          </div>
        </div>

        <div className="upgrade-modal-price">
          <span className="upgrade-modal-amount">₹199</span>
          <span className="upgrade-modal-period">/ month</span>
        </div>

        {error && <p className="upgrade-modal-error">{error}</p>}

        <button className="upgrade-modal-cta" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Opening checkout…' : 'Upgrade to Pro'}
        </button>
        <p className="upgrade-modal-note">Secure payment via Razorpay. Cancel anytime.</p>
      </div>
    </div>
  )
}
