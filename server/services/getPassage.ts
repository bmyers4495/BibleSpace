import axios from "axios";
let response = null

export type Reference = {
  version: string,
  bookName: string,
  bookFullName:string,
  bookID: number,
  chapter: number,
  verses?: number[],
};

export const getPassageService = async (bibleReference: Reference) => {
  try{
  if (!bibleReference.verses){
    const uri = `https://bolls.life/get-text/${bibleReference.version}/${bibleReference.bookID}/${bibleReference.chapter}`
    
    console.log("uri: ", uri)
    response = await axios.get(
      uri
    ); 
    return await response.data.map((d:any) => ({
      bookName: bibleReference.bookName,
      bookID: bibleReference.bookID,
      chapter: bibleReference.chapter,
      text: d.text,
      fullBookName: bibleReference.bookFullName,
      verses: d.verse}))

  }else {
    console.log("verses")
    response = await axios.post(
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
      fullBookName: bibleReference.bookFullName,
      bookID: d.book,
      chapter: d.chapter,
      verses: d.verse,
      text: d.text,
      bookName: bibleReference.bookName
    }))
    console.log("verse reference: ", verseReference)
    return verseReference
  } 
  }catch (err) {
    throw new Error(
      `Error fetching data for Book: ${bibleReference.bookID}, Chapter: ${bibleReference.chapter} - ${err}`,
    );
  }
}
