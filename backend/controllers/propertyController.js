import { Property } from "../models/Property.js";

// ✅ Get all properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error("❌ Error fetching properties:", error);
        res.status(500).json({ message: "Error fetching properties", error: error.message });
    }
};

// ✅ Get a single property by ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json(property);
    } catch (error) {
        console.error("❌ Error fetching property:", error);
        res.status(500).json({ message: "Error fetching property", error: error.message });
    }
};

// ✅ Create a new property
export const createProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        console.error("❌ Error adding property:", error);
        res.status(500).json({ message: "Error adding property", error: error.message });
    }
};

// ✅ Update a property by ID
export const updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
        console.error("❌ Error updating property:", error);
        res.status(500).json({ message: "Error updating property", error: error.message });
    }
};

// ✅ Delete a property by ID
export const deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting property:", error);
        res.status(500).json({ message: "Error deleting property", error: error.message });
    }
};
