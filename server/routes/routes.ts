import express from 'express';
import { getPassageController } from '../controllers/passageController';
const router = express.Router();

// Define the route for fetching passages
router.get('/passages', getPassageController);

export default router;
