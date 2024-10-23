//resourcesController
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


// Updated addResource controller to handle the new fields
exports.addResource = async (req, res) => {
    const { name, type, status, expiryDate, condition, vendorName, userID } = req.body;

    if (!name || !type || !status || !vendorName || !userID) {
        return res.status(400).json({ error: "All required fields must be provided." });
    }

    try {
        const newResource = new Resource({
            name,
            type,
            status,
            expiryDate: expiryDate || null,  // Handle expiry date or set to null
            condition,
            vendorName,
            userID
        });

        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Updated editResource controller to update the fields
exports.editResource = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedResource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller method to update resource details
exports.updateResource = async (req, res) => {
    const { id } = req.params;
    const { name, type, status, expiryDate, condition, vendorName } = req.body;

    try {
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { name, type, status, expiryDate, condition, vendorName },
            { new: true }  // Return the updated document
        );

        if (!updatedResource) {
            return res.status(404).json({ error: "Resource not found." });
        }

        res.status(200).json(updatedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addInspectionLog = async (req, res) => {
    const { id } = req.params;  // Resource ID
    const { date, notes } = req.body;

    if (!date || !notes) {
        return res.status(400).json({ error: "Date and notes are required." });
    }

    try {
        const resource = await Resource.findById(id); // Ensure the resource exists

        if (!resource) {
            return res.status(404).json({ error: "Resource not found." });
        }

        // Push the new inspection log into the array
        resource.inspectionLogs.push({ date, notes });
        const updatedResource = await resource.save();

        res.status(200).json(updatedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

