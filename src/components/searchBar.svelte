<script lang=ts>
  import {verseStore } from '../store/bibleState.svelte'
  import type { bibleReference } from '../store/bibleState.svelte.ts'
  import languages from '../assets/languages.json'
//  import { onMount } from 'svelte';
  
  type translation = {
    short_name: string,
    full_name: string,
    updated: number
  }
  type translationLang = {
    language: string,
    translations: translation[]
  }


  let  data: Array<bibleReference[]>| undefined=$state(undefined) 
  let version = $state( "NKJV" ) 
  let queryStr = $state("")
  let err: string|undefined =$state(undefined)
  const englishTranslations: translationLang[] = languages.filter((lang) => lang.language === "English")
  
  

  const handleSumbit = async (e:Event)=>{
    e.preventDefault()
    err = undefined
    const urlEncodedQuery = queryStr.replace(' ', '%20')
    const apiQuery= `http://biblespace.duckdns.org:4000/passages?translation=${version}&passages=${urlEncodedQuery}` 
    try{
      const response = await fetch(apiQuery, { method:"GET", headers:{'Content-Type': 'application/json'} })
      if (!response.ok){
        throw new Error(`Error fetching from ${apiQuery}`)
      } else {
    
        data = await response.json()
        console.log("data", data)
        if (data){
          verseStore.set(data.flat(2))
        }
      }
    }catch(error:any){
      const e:Error = error as Error
      err = e.message
      verseStore.set([])

    }
  }


  

</script>
<div>
  <form onsubmit={handleSumbit}>
    <select name="version-dropbox" bind:value={version}>
      {#each englishTranslations[0].translations as translation}
        <option value={translation.short_name}>{translation.short_name}</option> 
      {/each}
    </select>
    <input type="input" bind:value={queryStr}/>
  </form>
</div>
  {#if err}
    <p>{err}</p>
  {/if}

<style>
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  input{
    min-width: 60vw;
  }
  select{
    min-width: 10vw;

  }
  
</style>

