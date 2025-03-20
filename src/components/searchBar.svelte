<script lang=ts>
  import {verseStore} from '../store/bibleState.svelte.ts'
  import { onMount } from 'svelte';
  import language from '../assets/languages.json'
  let  data = null;
  let error = null 
  let selectedVersion ='NKJV'
  let queryStr = ''
  

  interface VersionList {
    language: string,
    translations: {short_name: string, full_name: string, updated: number}  }

  const handleSumbit = async (e)=>{
    e.preventDefault()
    const urlEncodedQuey = queryStr.replace(' ', '%20')
    const apiQuery= `http://biblespace.duckdns.org:4000/passages?translation=${selectedVersion}&passages=${urlEncodedQuey}` 
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
        verseStore.set(verses)
      }
    }catch(error){
      console.log(error)
    }
  }

  const fetchTranslations = ():VersionList[] => {
    let englishLanguageList = []
    const englishLanguage = language.find(l => l.language === 'English')
    englishLanguageList.push(englishLanguage)

    return englishLanguageList
  }
let versions: VersionList[] = [] 

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

