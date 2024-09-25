const Resource = require('../models/resourceModel');

exports.getResources = async (req, res) => {
    const { userId } = req.query;
    console.log("UserID received from query:", userId);
    try {
        const resources = await Resource.find({ userID: userId }); // Ensure this matches your schema
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addResource = async (req, res) => {
    console.log("Request body:", req.body); // Log request body
    
    // Validate that required fields are present
    const { name, type, quantity, userID } = req.body;
    if (!name || !type || quantity == null || !userID) {
        return res.status(400).json({ error: "All fields are required." });
    }
    
    try {
        const newResource = new Resource(req.body); 
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (err) {
        console.error("Error saving resource:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        await Resource.findByIdAndDelete(id);
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editResource = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedResource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
