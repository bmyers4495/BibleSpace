<script lang=ts>
  import {readVerseStore} from '../store/bibleState.svelte'
  let passage = $state(null)
  readVerseStore.subscribe((v) => {
    passage = v
    console.log("v:", v)
  })
  const formatStr = (str: string) => {
    const exceptions = new Set(["of"])
    return str
     .split(" ")
     .map(b =>
     exceptions.has(b.toLowerCase()) ? b : b.charAt(0).toUpperCase()+b.slice(1)).join(" ")
  }


</script>

<div>
  
  {#each passage as verse, i}
    {#if i === 0 || (verse.bookName !== passage[i - 1].bookName || verse.chapter !== passage[i - 1].chapter)}
      <h2>{formatStr(verse.fullName)} {verse.chapter}</h2>
    {/if}
    <p><sup><span class="verses">{verse.verse}</span></sup>  <span class="text">{@html verse.text}</span></p>
{/each}
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
