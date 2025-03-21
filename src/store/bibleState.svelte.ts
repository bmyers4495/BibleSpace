import { writable, readonly } from "svelte/store";
export type bibleReference = {
  book: number;
  chapter: number;
  text: string;
  translation: string;
  verses: number;
  bookName: string;
};
export const verseStore = writable<bibleReference[]>([]);
export const readVerseStore = readonly<bibleReference[]>(verseStore);
