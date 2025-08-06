// controllers/interfaceController.js

const Interface = require('../models/Interface');

// Get all interfaces
const getAllInterfaces = async (req, res) => {
  try {
    const interfaces = await Interface.find();
    res.json(interfaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new interface
const addInterface = async (req, res) => {
  const { name, integrationKey, sourceSystem, targetSystem, description } = req.body;

  try {
    const newInterface = new Interface({
      // interfaceId,
      name,
      integrationKey,
      sourceSystem,
      targetSystem,
      description,
    });

    const savedInterface = await newInterface.save();
    res.status(201).json(savedInterface);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllInterfaces,
  addInterface,
};
