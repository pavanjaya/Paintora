import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getSpaceStory, SPACE_STORIES } from '@/lib/space-stories'
import SpaceStoryClient from '@/components/SpaceStoryClient'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SPACE_STORIES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = getSpaceStory(slug)
  if (!story) return { title: 'Paintora' }
  return {
    title: `${story.title} — Space Stories | Paintora`,
    description: story.headline,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const story = getSpaceStory(slug)
  if (!story) notFound()
  return <SpaceStoryClient story={story} />
}
