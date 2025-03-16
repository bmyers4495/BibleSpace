const bookAbbreviations: { [key: string]: string } = {
  "gen": "genesis",
  "exod": "exodus",
  "lev": "leviticus",
  "num": "numbers",
  "deut": "deuteronomy",
  "josh": "joshua",
  "judg": "judges",
  "ruth": "ruth",
  "1 sam": "1 samuel",
  "2 sam": "2 samuel",
  "1 kin": "1 kings",
  "2 kin": "2 kings",
  "1 chr": "1 chronicles",
  "2 chr": "2 chronicles",
  "ezra": "ezra",
  "neh": "nehemiah",
  "esth": "esther",
  "job": "job",
  "ps": "psalms",
  "prov": "proverbs",
  "eccl": "ecclesiastes",
  "song": "song of solomon",
  "isa": "isaiah",
  "jer": "jeremiah",
  "lam": "lamentations",
  "ezek": "ezekiel",
  "dan": "daniel",
  "hos": "hosea",
  "joel": "joel",
  "amos": "amos",
  "obad": "obadiah",
  "jonah": "jonah",
  "mic": "micah",
  "nah": "nahum",
  "hab": "habakkuk",
  "zeph": "zephaniah",
  "hag": "haggai",
  "zech": "zechariah",
  "mal": "malachi",
  "matt": "matthew",
  "mark": "mark",
  "luke": "luke",
  "john": "john",
  "acts": "acts",
  "rom": "romans",
  "1 cor": "1 corinthians",
  "2 cor": "2 corinthians",
  "gal": "galatians",
  "eph": "ephesians",
  "phil": "philippians",
  "col": "colossians",
  "1 thess": "1 thessalonians",
  "2 thess": "2 thessalonians",
  "1 tim": "1 timothy",
  "2 tim": "2 timothy",
  "titus": "titus",
  "phlm": "philemon",
  "heb": "hebrews",
  "james": "james",
  "1 pet": "1 peter",
  "2 pet": "2 peter",
  "1 john": "1 john",
  "2 john": "2 john",
  "3 john": "3 john",
  "jude": "jude",
  "rev": "revelation",
  // Add other abbreviations as needed
};

const parsePassage = (input: string, books: any[]) => {
  // Updated regex to handle multi-word book names and multiple verse references
  const passageRegex = /(\d*\s*[A-Za-z\s]+(?:\d*\s*[A-Za-z]+)?)\s*(\d+):([\d,\-\s]+)/g;
  const passages: { bookName: string,  bookID: number; chapter: number; verses: number[] }[] = [];

  // Split input by semicolons to separate each book's passages
  const passageGroups = input.split(';');

  passageGroups.forEach(group => {
    const matches = [...group.matchAll(passageRegex)];

    matches.forEach((match) => {
      let bookName = match[1].trim();  // "Gen", "1 Cor", "Matt"
      const chapter = parseInt(match[2], 10);
      const verseString = match[3].replace(/\s+/g, ''); // Remove spaces
      const verses: number[] = [];

      // Process verses and ranges (e.g., "1,2,5-7")
      verseString.split(',').forEach(part => {
        if (part.includes('-')) {
          // Handle range (e.g., "5-7" -> [5,6,7])
          const [start, end] = part.split('-').map(n => parseInt(n, 10));
          for (let i = start; i <= end; i++) {
            verses.push(i);
          }
        } else {
          // Single verse
          verses.push(parseInt(part, 10));
        }
      });

      // Map book abbreviation to full name (if necessary)
      const fullBookName = bookAbbreviations[bookName.toLowerCase()] || bookName;

      // Find the book ID using the full book name
      const book = books.find((book: any) => book.name.toLowerCase() === fullBookName.toLowerCase());

      if (book) {
        passages.push({bookName, bookID: book.bookid, chapter, verses});
      } else {
        console.error(`Book not found: ${fullBookName}`);
      }
    });
  });

  return passages;
};
export default parsePassage
