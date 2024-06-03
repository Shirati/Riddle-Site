const mongoose = require('mongoose');
const Age = require('../models/age.model');

module.exports = {
  getAllAge: (req, res) => {
    // Find all Age in the database
    Age.find()
      .then(Age => {
        res.json(Age);
      })
      .catch(err => {
        // Error finding Age
        res.status(500).json({ error: 'Failed to get Age' });
      });
  },
  getById: (req, res) => {
    const id = req.params.ageId;

    // Find the Age in the database
    Age.findOne({ id })
      .then(foundIdAge => {
        if (foundIdeAge) {
          // Age found, return it
          res.json(foundAge);
        } else {
          // Age not found
          res.status(404).json({ error: 'Age not found' });
        }
      })
      .catch(err => {
        // Error finding Age
        res.status(500).json({ error: 'Failed to get Age' });
      });
  },
  createAge: (req, res) => {
    const {  age_range } = req.body;
    
        // Create a new Age object
        const newAge = new Age({ age_range});

        // Save the  age_range to the database
        newAge.save()
          .then(savedAge => {
            // Return the created Age
            res.json(savedAge);
          })
          .catch(err => {
            // Error saving Age
            res.status(500).json({ error: 'Failed to create Age' });
          });
      
    
  },
  updateAge: (req, res) => {
    const id = req.params.ageId;
    const {  age_range} = req.body;
   
    // Find the Age in the database and update its properties
    Age.findOneAndUpdate({ id }, { age_range }, { new: true })
      .then(updatedAge => {
        if (updatedAge) {
          // Age updated successfully, return the updated Age
          res.json(updatedAge);
        } else {
          // Age not found
          res.status(404).json({ error: 'Age not found' });
        }
      })
      .catch(err => {
        // Error updating Age
        res.status(500).json({ error: 'Failed to update Age' });
      });
  },
  deleteAge: (req, res) => {
    const id = req.params.ageId;
   
    // Find the Age in the database and delete it
    Age.findByIdAndDelete(id)
      .then(deletedIdAge => {
        if (deletedIdAge) {
          // Age deleted successfully
          res.json({ message: 'Age deleted successfully' });
        } else {
          // Age not found
          res.status(404).json({ error: 'Age not found' });
        }
      })
      .catch(error => {
        // Error deleting Age
        res.status(500).json({ error: 'Failed to delete Age' });
      });
  },
 
  }
