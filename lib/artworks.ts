import { supabase } from './supabase'
import type { ArtItem } from './data'
import { FEED_ARTWORKS, GALLERY_IMGS } from './data'

const FALLBACK_FEED = FEED_ARTWORKS
const FALLBACK_ALL = [...FEED_ARTWORKS, ...GALLERY_IMGS]

function mapRow(a: any): ArtItem {
  return {
    id: a.id as string,
    name: a.title ?? 'Untitled',
    img: a.thumbnail_url ?? '',
    style: a.style?.name ?? a.category?.name ?? 'Art',
    medium: a.medium?.name,
    dim: a.dimensions,
  }
}

const SELECT = 'id, title, thumbnail_url, style:styles(name), medium:mediums(name), category:categories(name)'

export async function fetchArtworks(): Promise<ArtItem[]> {
  const { data } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (!data || data.length === 0) return FALLBACK_ALL
  return data.map(mapRow)
}

export async function fetchFeedArtworks(): Promise<ArtItem[]> {
  const { data } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(12)

  if (!data || data.length === 0) return FALLBACK_FEED
  return data.map(mapRow)
}

export async function searchArtworks(query: string): Promise<ArtItem[]> {
  if (!query.trim()) return fetchArtworks()

  const q = query.trim().toLowerCase()

  // Search across title, style name, medium name, category name using ilike
  const { data } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('status', 'published')
    .or(`title.ilike.%${q}%,styles.name.ilike.%${q}%,mediums.name.ilike.%${q}%,categories.name.ilike.%${q}%`)
    .order('created_at', { ascending: false })

  if (data && data.length > 0) return data.map(mapRow)

  // Fallback: fetch all and filter client-side (handles joined column filtering)
  const { data: all } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (!all || all.length === 0) return []

  return all
    .filter((a: any) =>
      (a.title ?? '').toLowerCase().includes(q) ||
      (a.style?.name ?? '').toLowerCase().includes(q) ||
      (a.medium?.name ?? '').toLowerCase().includes(q) ||
      (a.category?.name ?? '').toLowerCase().includes(q)
    )
    .map(mapRow)
}

export async function fetchArtworkById(id: string): Promise<ArtItem | null> {
  const { data } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('id', id)
    .single()

  return data ? mapRow(data) : null
}
