<script lang="ts">
  import BibleReader from './components/bibleReader.svelte'
  import SearchBar from './components/searchBar.svelte'
</script>

<main>
  <SearchBar />
  <BibleReader />
</main>

<style>

  main > *{
    flex-wrap:wrap;


  }
</style>
