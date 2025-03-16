import  parsePassage  from '../helpers/parsePassageHelper'
import { Request, Response } from 'express';
import  getBookIDs  from '../services/getBookIDService';  // Import the getBookIDs function
import   {getPassageService, Reference} from '../services/getPassage';

const getPassageController = async (req: Request, res: Response): Promise<any>=> {
  try {
    const { translation, passages: passageInput } = req.query;

    // Check if translation and passages are provided
    if (!passageInput || !translation) {
      return res.status(400).json({ error: 'Both translation and passages are required' });
    }

    // Log the raw input to check

    // Fetch books based on the translation
    const books = await getBookIDs(translation as string);

    // Check if books were fetched successfully

    // Parse passages
    const parsedPassages = parsePassage(passageInput as string, books);
    console.log("ParsedPassage", parsedPassages)

    // Log the parsed passages

    // If no passages were parsed, return an error
    if (!parsedPassages.length) {
      return res.status(400).json({ error: 'No valid passages found' });
    }

    const passageList:Reference[]= []
    for (const passage of parsedPassages) {
      const passageWithVersion = { ...passage, version: translation as string };
      const passageDataArray = await getPassageService(passageWithVersion);
      console.log(passageDataArray)
      passageList.push(passageDataArray);
    }   
    

    // Return the fetched passages
    return res.json(passageList);
  } catch (error) {
    console.error('Error fetching passages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export {getPassageController};

