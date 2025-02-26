import express from 'express';
import { createItem, getAllItems, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.post('/create', createItem);
router.get('/all', getAllItems);
router.delete('/delete/:id', deleteItem);

export default router;
