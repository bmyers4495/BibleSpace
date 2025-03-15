<script lang=ts>
  import {verseStore} from '../store/bibleState.svelte.ts'
  let  data = '';
  let version = "NKJV"
  let queryStr = ''

  const handleSumbit = async (e)=>{
    e.preventDefault()
    const urlEncodedQuey = queryStr.replace(' ', '%20')
    const apiQuery= `http://127.0.0.1:4000/passages?translation=NKJV&passages=${urlEncodedQuey}` 
    console.log(urlEncodedQuey)
    try{
      const response = await fetch(apiQuery, { method:"GET", headers:{'Content-Type': 'application/json'} })
      if (!response.ok){
        throw new Error(`Error fetching from ${apiQuery}`)
      } else {
        data = await response.json()
        const verses = data.flat(2).map(verse =>({
          book: verse.book,
          chapter: verse.chapter,
          text: verse.text,
          translation: verse.translation, 
          verse:verse.verse
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
    width:100%
    
  }
</style>

