const mongoose = require('mongoose');
const Difficulty = require('../models/difficulty.model');

module.exports = {
  getAllDifficulty: (req, res) => {
    // Find all Difficulty in the database
    Difficulty.find()
      .then(difficulty => {
        res.json(difficulty);
      })
      .catch(err => {
        // Error finding Difficulty
        res.status(500).json({ error: 'Failed to get Difficulty' });
      });
  },
  getById: (req, res) => {
    const id = req.params.difficultyId;
console.log(id);
    // Find the difficulty in the database
    Difficulty.findOne({ _id: id })
      .then(foundIdDifficulty => {
        if (foundIdDifficulty) {
          // Difficulty found, return it
          res.json(foundIdDifficulty);
        } else {
          // Difficulty not found
          res.status(404).json({ error: 'Difficulty not found' });
        }
      })
      .catch(err => {
        // Error finding Difficulty
        res.status(500).json({ error: 'Failed to get Difficulty' });
      });
  },
  createDifficulty: (req, res) => {
    const { difficulty_riddle } = req.body;
    
        // Create a new Difficulty object
        const newDifficulty = new Difficulty({ difficulty_riddle});

        // Save the Difficulty_riddle to the database
        newDifficulty.save()
          .then(savedDifficulty => {
            // Return the created Difficulty
            res.json(savedDifficulty);
          })
          .catch(err => {
            // Error saving Difficulty
            res.status(500).json({ error: 'Failed to create Difficulty' });
          });
      
    
  },
  updatedDifficulty: (req, res) => {
    const id = req.params.difficultyId;
    const { difficulty_riddle} = req.body;
   
    // Find the Difficulty in the database and update its properties
    Difficulty.findOneAndUpdate({ id }, {difficulty_riddle }, { new: true })
      .then(updatedDifficulty => {
        if (updatedDifficulty) {
          // Difficulty updated successfully, return the updated Difficulty
          res.json(updatedDifficulty);
        } else {
          // Difficulty not found
          res.status(404).json({ error: 'Difficulty not found' });
        }
      })
      .catch(err => {
        // Error updating Difficulty
        res.status(500).json({ error: 'Failed to update Difficulty' });
      });
  },
  deleteDifficulty: (req, res) => {
    const id = req.params.difficultyId;
   
    // Find the Difficulty in the database and delete it
    Difficulty.findByIdAndDelete(id)
      .then(deletedIdDifficulty => {
        if (deletedIdDifficulty) {
          // Difficulty deleted successfully
          res.json({ message: 'Difficulty deleted successfully' });
        } else {
          // Difficulty not found
          res.status(404).json({ error: 'Difficulty not found' });
        }
      })
      .catch(error => {
        // Error deleting Difficulty
        res.status(500).json({ error: 'Failed to delete Difficulty' });
      });
  },
 
  }
