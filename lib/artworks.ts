import { supabase } from './supabase'
import type { ArtItem } from './data'
import { FEED_ARTWORKS, GALLERY_IMGS } from './data'

const FALLBACK_FEED = FEED_ARTWORKS
const FALLBACK_ALL = [...FEED_ARTWORKS, ...GALLERY_IMGS]

function parseOrientation(dim?: string): ArtItem['orientation'] {
  if (!dim) return undefined
  const nums = dim.match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i)
  if (!nums) return undefined
  const w = parseFloat(nums[1]), h = parseFloat(nums[2])
  if (Math.abs(w - h) / Math.max(w, h) < 0.1) return 'Square'
  return w > h ? 'Horizontal' : 'Vertical'
}

function mapRow(a: any): ArtItem {
  return {
    id: a.id as string,
    name: a.title ?? 'Untitled',
    img: a.thumbnail_url ?? '',
    style: a.style?.name ?? a.category?.name ?? 'Art',
    medium: a.medium?.name,
    dim: a.dimensions,
    orientation: parseOrientation(a.dimensions),
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

const STOP_WORDS = new Set(['painting', 'paintings', 'for', 'a', 'an', 'the', 'and', 'of', 'in', 'on', 'with'])

function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map(w => w.replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length > 1 && !STOP_WORDS.has(w))
}

export async function searchArtworks(query: string): Promise<ArtItem[]> {
  if (!query.trim()) return fetchArtworks()

  const keywords = extractKeywords(query)
  if (keywords.length === 0) return fetchArtworks()

  // Fetch all published artworks and filter client-side by any keyword match
  const { data: all } = await supabase
    .from('artworks')
    .select(SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (!all || all.length === 0) return []

  return all
    .filter((a: any) => {
      const fields = [
        (a.title ?? '').toLowerCase(),
        (a.style?.name ?? '').toLowerCase(),
        (a.medium?.name ?? '').toLowerCase(),
        (a.category?.name ?? '').toLowerCase(),
      ]
      return keywords.some(kw => fields.some(f => f.includes(kw)))
    })
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
