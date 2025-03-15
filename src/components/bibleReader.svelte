<script lang=ts>
  import SearchBar from './searchBar.svelte'
  import {readVerseStore} from '../store/bibleState.svelte'
  let passage = $state('')
  readVerseStore.subscribe((v) => {
    passage = v
  })


</script>

<div>
  <SearchBar />
  {#each passage as verse}
    <p><sup>{verse.verse}</sup> {verse.text}</p>
{/each}
  
</div>

<style>
  div{
  }
  p{
    width:100%;
    text-align: left;
    padding: 0;
  }
</style>
