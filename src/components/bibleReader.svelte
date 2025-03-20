<script lang=ts>
  import {verseStore} from '../store/bibleState.svelte'
  import SearchBar from './searchBar.svelte'
  let passage = $state([])
  let error: string|undefined = ''
  let data = $state(null)
  let selectedVersion = $state('ESV')
  let queryStr = $state('Gen 1:1')

  const formatStr = (str: string) => {
    const exceptions = new Set(["of"])
    return str
     .split(" ")
     .map(b =>
     exceptions.has(b.toLowerCase()) ? b : b.charAt(0).toUpperCase()+b.slice(1)).join(" ")
  }

  const handleSumbit = async (e)=>{

    console.log("queryStr: ", queryStr)
    e.preventDefault()
    const urlEncodedQuey = queryStr.replace(' ', '%20')
    const apiQuery= `http://biblespace.duckdns.org:4000/passages?translation=${selectedVersion}&passages=${queryStr}` 
    console.log(apiQuery)
    try{
      const response = await fetch(apiQuery, { method:"GET", headers:{'Content-Type': 'application/json'} })
      if (!response.ok){
        throw new Error(`Error fetching from ${apiQuery}`)
      } else {
        data = await response.json()
        const verses = data.flat(2).map(verse =>({
          bookID: verse.bookID,
          fullName:verse.fullBookName,
          chapter: verse.chapter,
          text: verse.text,
          translation: selectedVersion, 
          verse:verse.verses,
          bookName:verse.bookName
        }));
        console.log("data: ", response)
        passage = verses
      }
    }catch(error){
      console.log(error)
    } 
  }

</script>

<SearchBar {handleSumbit} { queryStr } { selectedVersion }}/>
<div>
  {#if error}
    <p class="error">Error: {error}</p>
  {:else}
    {#each passage as verse, i}
      {#if i === 0 || (verse.bookName !== passage[i - 1].bookName || verse.chapter !== passage[i - 1].chapter)}
        <h2>{formatStr(verse.fullName)} {verse.chapter}</h2>
      {/if}
      <p><sup><span class="verses">{verse.verse}</span></sup>  <span class="text">{@html verse.text}</span></p>
    {/each}
  {/if}
</div>

<style>
  div{
    margin-top: 2rem;
    height: 70vh;
    overflow-y:scroll;
    scroll-behavior:smooth;
    scrollbar-width:none;
    border-right: none;
    padding-right:3em;
    

  }
  p{

    text-align: left;
    padding: 0;
    max-width:70vw;
     -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
  .text{
  }
  .verses{
    font-size: 0.8em;
    color: grey;
  }
  .verses:hover{
    color: black;
    cursor: pointer;
  }
</style>
