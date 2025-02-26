import { Property } from "../models/Property.js";

export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error("❌ Error fetching properties:", error);
        res.status(500).json({ 
            message: "Error fetching properties",
            error: error.message 
        });
    }
};
