import axios from 'axios'

type Reference = {
  version: string,
  bookID: number,
  chapter: number,
  verses: number[]
}

const getPassageService = async(bibleReference: Reference) =>{
  console.log("Reference:", bibleReference.version)

  if (!bibleReference.verses){
    bibleReference.verses = [1]
  }
      try{
        const response = await axios.post(
        'https://bolls.life/get-verses/',
        [
          {
            translation: bibleReference.version,
            book: bibleReference.bookID,
            chapter: bibleReference.chapter,
            verses: bibleReference.verses
          }
        ],
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (err) {
      throw new Error(`Error fetching data for Book: ${bibleReference.bookID}, Chapter: ${bibleReference.chapter} - ${err}`);
    }
  };

  // try {
    // const uniqueRequests = new Set<string>();
    // // Create an array of promises for each combination of book and chapter
    // const promises:Promise<any>[] = [];
    // for (let i = 0; i < bibleReference.bookID.length; i++) {
    //   for (let j = 0; j < chapter.length; j++) {
    //     const requestKey = `${bibleReference.bookID[i]}-${chapter[j]}`; // Generate a unique key for each book/chapter pair
    //     if(!uniqueRequests.has(requestKey)){
    //       uniqueRequests.add(requestKey)
    //       promises.push(fetchPassage(bibleReference.bookID[i], chapter[j])); // Call fetchPassage for each book/chapter
    //     }
    //   }
    // }
    //
    // // Wait for all promises to resolve and return the results
    // const passages = await Promise.all(promises);
    // return passages;
    
//       } catch(err){
//     throw new Error (`Error fetching date: ${err}`)
//   }
// }


export {
  getPassageService
}
