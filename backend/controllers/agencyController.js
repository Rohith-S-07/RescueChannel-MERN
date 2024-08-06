const Agency = require('../models/agencyModel');

const getAgencies = async (req, res) => {
  const agencies = await Agency.find({});
  res.json(agencies);
};

const createAgency = async (req, res) => {
  const { name, location, contact } = req.body;
  const agency = new Agency({ name, location, contact });
  await agency.save();
  res.status(201).json(agency);
};

module.exports = { getAgencies, createAgency };
