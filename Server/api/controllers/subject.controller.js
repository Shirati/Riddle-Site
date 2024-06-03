const mongoose = require('mongoose');
const Subject = require('../models/subject.model');

module.exports = {
  getAllSubject: (req, res) => {
    // Find all subject in the database
    Subject.find()
      .then(subject => {
        res.json(subject);
      })
      .catch(err => {
        // Error finding subject
        res.status(500).json({ error: 'Failed to get subject' });
      });
  },
  getById: (req, res) => {
    const id = req.params.subjectId;

    // Find the Subject in the database
    Subject.findOne({ id })
      .then(foundIdSubject => {
        if (foundIdeSubject) {
          // subject found, return it
          res.json(foundSubject);
        } else {
          // Subject not found
          res.status(404).json({ error: 'Subject not found' });
        }
      })
      .catch(err => {
        // Error finding Subject
        res.status(500).json({ error: 'Failed to get Subject' });
      });
  },
  createSubject: (req, res) => {
    const { subject_riddle } = req.body;
    
        // Create a new Subject object
        const newSubject = new Subject({ subject_riddle});

        // Save the subject_riddle to the database
        newSubject.save()
          .then(savedSubject => {
            // Return the created Subject
            res.json(savedSubject);
          })
          .catch(err => {
            // Error saving Subject
            res.status(500).json({ error: 'Failed to create Subject' });
          });
      
    
  },
  updatedSubject: (req, res) => {
    const id = req.params.subjectId;
    const { subject_riddle} = req.body;
   
    // Find the Subject in the database and update its properties
    Subject.findOneAndUpdate({ id }, {subject_riddle }, { new: true })
      .then(updatedSubject => {
        if (updatedSubject) {
          // Subject updated successfully, return the updated Subject
          res.json(updatedSubject);
        } else {
          // Subject not found
          res.status(404).json({ error: 'Subject not found' });
        }
      })
      .catch(err => {
        // Error updating Subject
        res.status(500).json({ error: 'Failed to update Subject' });
      });
  },
  deleteSubject: (req, res) => {
    const id = req.params.subjectId;
   
    // Find the Subject in the database and delete it
    Subject.findByIdAndDelete(id)
      .then(deletedIdSubject => {
        if (deletedIdSubject) {
          // Subject deleted successfully
          res.json({ message: 'Subject deleted successfully' });
        } else {
          // Subject not found
          res.status(404).json({ error: 'Subject not found' });
        }
      })
      .catch(error => {
        // Error deleting Subject
        res.status(500).json({ error: 'Failed to delete Subject' });
      });
  },
 
  }
