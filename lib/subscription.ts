import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with service role (bypasses RLS) — only use in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function getUserSubscription(userId: string) {
  const { data } = await supabaseAdmin
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
