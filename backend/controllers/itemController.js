import Item from '../models/Item.js';

export const createItem = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        
        if (!name || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newItem = new Item({ name, price, category });
        await newItem.save();
        
        res.status(201).json({ message: "Property added successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error creating property", error: error.message });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        if (items.length === 0) {
            return res.status(404).json({ message: "No properties found" });
        }
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Property not found" });
        }
        await item.deleteOne();
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error: error.message });
    }
};
