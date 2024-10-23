const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  // E.g. equipment, vehicle
    status: { 
        type: String, 
        enum: ['active', 'maintenance', 'expired', 'retired'],  // Added status field
        required: true
    },
    expiryDate: { type: Date, default: null },  // Nullable for items that don't expire
    condition: { type: String, default: 'Good' },  // Add condition to track resource state
    vendorName: { type: String, required: true },  // Vendor supplying the equipment
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Agency user ID
    inspectionLogs: [{
        date: { type: Date, required: true },
        notes: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
