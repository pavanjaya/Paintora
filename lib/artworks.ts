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

export async function fetchArtworkById(id: string): Promise<ArtItem | null> {
  const { data } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('id', id)
    .single()

  return data ? mapRow(data) : null
}
