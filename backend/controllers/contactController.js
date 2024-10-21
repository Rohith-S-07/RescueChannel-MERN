const Contact = require('../models/contactModel');

// Handle form submission
exports.submitContactForm = async (req, res) => {
  const { first_name, last_name, email, phone, subject, query_type, message } = req.body;

  try {
    // Create a new contact entry
    const newContact = new Contact({
      first_name,
      last_name,
      email,
      phone,
      subject,
      query_type,
      message,
    });

    // Save it to the database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      createdAt: newContact.createdAt // Optionally return the created timestamp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Fetch all contact reports
exports.getContactReports = async (req, res) => {
    try {
      const reports = await Contact.find(); // Fetch all contact reports from the database
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching reports.',
      });
    }
  };
  
  // Delete a specific contact report
  exports.deleteContactReport = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedReport = await Contact.findByIdAndDelete(id); // Delete the report by ID
  
      if (!deletedReport) {
        return res.status(404).json({
          success: false,
          message: 'Report not found.',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Report deleted successfully.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting report.',
      });
    }
  };