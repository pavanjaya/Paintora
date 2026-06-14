import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase service role not configured')
  return createClient(url, key)
}

export async function getUserSubscription(userId: string) {
  const { data } = await getSupabaseAdmin()
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .single()
  return data
}

export function isProUser(sub: { status: string; current_period_end: string } | null): boolean {
  if (!sub) return false
  if (sub.status !== 'active') return false
  return new Date(sub.current_period_end) > new Date()
}
