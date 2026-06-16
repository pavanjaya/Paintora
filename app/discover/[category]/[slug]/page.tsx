import { redirect } from 'next/navigation'

const CATEGORY_MAP: Record<string, string> = {
  spaces: 'spaces',
  styles: 'styles',
  mediums: 'mediums',
  subjects: 'subjects',
}

type Props = { params: Promise<{ category: string; slug: string }> }

export default async function Page({ params }: Props) {
  const { category, slug } = await params
  const section = CATEGORY_MAP[category] ?? 'spaces'
  redirect(`/${section}/${slug}`)
}
