import type { Metadata } from 'next'
import SearchPage from '@/components/SearchPage'

type Props = { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `"${q}" Paintings | Paintora` : 'Search Paintings | Paintora',
    description: q ? `Browse paintings matching "${q}" on Paintora.` : 'Search thousands of curated paintings on Paintora.',
  }
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams
  return <SearchPage query={q ?? ''} />
}
