import axios from "axios";

type Reference = {
  version: string,
  bookName: string,
  bookID: number,
  chapter: number,
  verses: number[],
};

const getPassageService = async (bibleReference: Reference) => {
  console.log("Reference:", bibleReference.version);

  if (!bibleReference.verses) {
    bibleReference.verses = [1];
  }
  try {
    const response = await axios.post(
      "https://bolls.life/get-verses/",
      [
        {
          translation: bibleReference.version,
          book: bibleReference.bookID,
          chapter: bibleReference.chapter,
          verses: bibleReference.verses,
        },
      ],
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const verseReference = await response.data.flat(2).map((d:any) => ({
      version: d.translation,
      bookID: d.book,
      chapter: d.chapter,
      verses: d.verse,
      text: d.text,
      bookName: bibleReference.bookName
    }))
    console.log(response.data)
    return verseReference
  } catch (err) {
    throw new Error(
      `Error fetching data for Book: ${bibleReference.bookID}, Chapter: ${bibleReference.chapter} - ${err}`,
    );
  }
};

export { Reference, getPassageService };
