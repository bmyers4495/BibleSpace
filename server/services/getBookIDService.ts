import axios from 'axios';

const getBookIDs = async (translation: string) => {
  try {
    const response = await axios.get(`https://bolls.life/get-books/KJV/`);
    return response.data; // Assuming the response is an array of books
  } catch (error: any) {
    throw new Error(`Error fetching books: ${error.message}`);
    
  }
};

export default getBookIDs;
