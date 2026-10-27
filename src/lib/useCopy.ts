import { copy } from '../content/copy.ts'
import { useAppContext } from './Context'

/** Copy for the new landing sections in the current language. */
export function useCopy() {
  const { lang } = useAppContext()
  return { lang, c: copy[lang] }
}

export const SECTION_LABEL =
  "text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary"
