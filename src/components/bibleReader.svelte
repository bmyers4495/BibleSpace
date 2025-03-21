<script lang=ts>
  import {readVerseStore} from '../store/bibleState.svelte'
  import type { bibleReference } from '../store/bibleState.svelte'
  let passage: bibleReference[]| undefined= $state(undefined)
  readVerseStore.subscribe((v) => {
    passage = v
  })


</script>

<div>
  {#if passage}
  {#each passage as verse, i}
    {#if i === 0 || (verse.bookName !== passage[i - 1].bookName || verse.chapter !== passage[i - 1].chapter)}
        <h2>{verse.bookName} {verse.chapter}</h2>
    {/if}
    <p><sup>{verse.verses}</sup> {@html verse.text}</p>
  {/each}
  {/if}
</div>

<style>
  div{
    
    min-height: 80vh;
    overflow-y:scroll;
    scrollbar-width: none;
    scroll-behavior:smooth;
    margin-top: 1rem;
    max-height: 80vh;

  }
  p{
    text-align: left;
    padding: 0;
    max-width:70vw;
  }
</style>
