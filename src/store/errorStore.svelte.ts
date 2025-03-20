import { writable } from "svelte/store";

export const errorStore = writable<string>('');

export const setError = (error: string) => {
  errorStore.set(error)
}



export const getError = () => {
  let error: string= '';
  errorStore.subscribe(value => {
    error = value;
  })();
  return error;
}

export const clearError = () => {
  errorStore.set('');
};

export const hasError = () => {
  let error: string|undefined = null 
  errorStore.subscribe(value => {
    error = value;
  })();
  if (error) {
    return true;
  }else {
    return false;
  }
}





