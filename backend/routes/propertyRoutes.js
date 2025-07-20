import express from 'express';
import { 
    getProperties, 
    getPropertyById, 
    createProperty, 
    updateProperty, 
    deleteProperty 
} from '../controllers/propertyController.js';

const router = express.Router();

// ✅ Get all properties
router.get('/', getProperties);

// ✅ Get a single property by ID
router.get('/:id', getPropertyById);

// ✅ Add a new property
router.post('/', createProperty);

// ✅ Update a property by ID
router.put('/:id', updateProperty);

// ✅ Delete a property by ID
router.delete('/:id', deleteProperty);

export default router;
