import express from 'express';
import { getPassageController } from '../controllers/passageController';
const router = express.Router();

// Define the route for fetching passages
router.get('/passages', getPassageController);
// router.post('/login', authController.login);
// router.post('/register', authController.register);

export default router;
