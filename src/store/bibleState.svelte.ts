import {writable, readonly} from 'svelte/store'
type bibleVerse = {
  book: number,
  chapter: number,
  test: string,
  translation: string,
  verse: number
}
export const verseStore = writable<bibleVerse[]>([])
export const readVerseStore = readonly<bibleVerse[]>(verseStore)
