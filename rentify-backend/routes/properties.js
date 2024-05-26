const express = require('express');
const Property = require('../models/Property');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Middleware for authentication

// Create a new property
router.post('/', authMiddleware, async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyFacilities } = req.body;
  try {
    const property = new Property({
      owner: req.user.id,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyFacilities
    });
    await property.save();
    res.status(201).send('Property created');
  } catch (error) {
    res.status(400).send('Error creating property');
  }
});

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'firstName lastName email phone');
    res.json(properties);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get a single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'firstName lastName email phone');
    if (!property) {
      return res.status(404).send('Property not found');
    }
    res.json(property);
  } catch (error) {
    res.status(400).send('Error fetching property');
  }
});

// Update a property by ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyFacilities } = req.body;
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { place, area, bedrooms, bathrooms, nearbyFacilities },
      { new: true }
    );
    if (!property) {
      return res.status(404).send('Property not found');
    }
    res.json(property);
  } catch (error) {
    res.status(400).send('Error updating property');
  }
});

// Delete a property by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send('Property not found');
    }
    res.status(200).send('Property deleted');
  } catch (error) {
    res.status(400).send('Error deleting property');
  }
});

module.exports = router;
