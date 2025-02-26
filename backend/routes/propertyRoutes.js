import express from 'express';
import { getProperties } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/', getProperties);

export default router; // ✅ Fix: Ensure this is a default export
