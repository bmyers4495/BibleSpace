<script lang=ts>
  import SearchBar from './searchBar.svelte'
  import {readVerseStore} from '../store/bibleState.svelte'
  let passage = $state('')
  readVerseStore.subscribe((v) => {
    passage = v
    console.log("v:", v)
  })


</script>

<div>
  
  {#each passage as verse, i}
    {#if i === 0 || (verse.bookName !== passage[i - 1].bookName || verse.chapter !== passage[i - 1].chapter)}
        <h2>{verse.bookName} {verse.chapter}</h2>
    {/if}
    <p><sup>{verse.verse}</sup> {verse.text}</p>
{/each}
</div>

<style>
  div{
    max-height: 80vh;
    min-height: 70vh;
    overflow:scroll;
    scroll-behavior:smooth;

  }
  p{
    text-align: left;
    padding: 0;
    max-width:70vw;
  }
</style>
