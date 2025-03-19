<script lang=ts>
  import {verseStore} from '../store/bibleState.svelte.ts'
  let  data = '';
  let version = "NKJV"
  let queryStr = ''

  const handleSumbit = async (e)=>{
    e.preventDefault()
    const urlEncodedQuey = queryStr.replace(' ', '%20')
    const apiQuery= `http://141.148.159.40:4000/passages?translation=NKJV&passages=${urlEncodedQuey}` 
    try{
      const response = await fetch(apiQuery, { method:"GET", headers:{'Content-Type': 'application/json'} })
      if (!response.ok){
        throw new Error(`Error fetching from ${apiQuery}`)
      } else {


        data = await response.json()
        console.log("data", data[2])
        const verses = data.flat(2).map(verse =>({
          bookID: verse.bookID,
          chapter: verse.chapter,
          text: verse.text,
          translation: verse.version, 
          verse:verse.verses,
          bookName:verse.bookName
        }));
        verseStore.set(verses)
      }
    }catch(error){
      console.log(error)
    }
  }

  

</script>
<div>
  <form onsubmit={handleSumbit}>
    <input type="input" bind:value={queryStr}/>
  </form>
</div>

<style>
  input{
    min-width: 70vw;
  }
  
</style>

