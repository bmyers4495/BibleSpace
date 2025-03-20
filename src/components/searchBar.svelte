<script lang=ts>
  import { onMount } from 'svelte';
  import language from '../assets/languages.json'
  let { selectedVersion, queryStr, handleSumbit } = $state()


interface VersionList {
    language: string,
    translations: {short_name: string, full_name: string, updated: number}  }


  const fetchTranslations = ():VersionList[] => {
    let englishLanguageList = []
    const englishLanguage = language.find(l => l.language === 'English')
    englishLanguageList.push(englishLanguage)
    return englishLanguageList
  }
let versions: VersionList = $state() 

  onMount(() =>{
    versions = fetchTranslations().flatMap(b=> b.translations)
  })
  

</script>
<div>
  <form onsubmit={handleSumbit}>
    <select bind:value="{ selectedVersion }">
      {#each versions as  translation}
        <option value="{translation.short_name}" >{translation.short_name}</option>
      {/each}
    </select>
    <input type="input" placeholder="Search Passage" bind:value={queryStr}/>
  </form>
</div>

<style>
  form{
    min-width: 70vw;
  }
  input{
    width: 50vw;
  }
  select{
    width: 20%;
  }
  
</style>

