import { writable, readonly } from "svelte/store";
type bibleReference = {
  book: number;
  chapter: number;
  test: string;
  translation: string;
  verse: number;
};
export const verseStore = writable<bibleReference[]>([]);
export const readVerseStore = readonly<bibleReference[]>(verseStore);
