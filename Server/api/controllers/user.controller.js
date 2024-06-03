const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model');

module.exports = {
  getAllUsers: (req, res) => {
    // Find all Users in the database
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        // Error finding Users
        res.status(500).json({ error: 'Failed to get Users' });
      });
  },
  getById: (req, res) => {
    const id = req.params.userId;

    // Find the User in the database
    User.findOne({ id })
      .then(foundIdUser => {
        if (foundIdeUser) {
          // User found, return it
          res.json(foundUser);
        } else {
          // User not found
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        // Error finding User
        res.status(500).json({ error: 'Failed to get User' });
      });
  },
  createUser: (req, res) => {
    const { username, email, password } = req.body;
    User.find({ email }).then((users) => {
      if (users.length >= 1) {
        return res.status(409).json({ message: "Email exists" })
      }
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({ error })
        }
        // Create a new User object
        const newUser = new User({ username, email, password: hash });

        // Save the User to the database
        newUser.save()
          .then(savedUser => {
            // Return the created User
            res.json(savedUser);
          })
          .catch(err => {
            // Error saving User
            res.status(500).json({ error: 'Failed to create User' });
          });
      });
    })
  },
  updatedUser: (req, res) => {
    const id = req.params.userId;
    const { username, email, password } = req.body;

    // Find the User in the database and update its properties
    User.findOneAndUpdate({ id }, { username, email, password }, { new: true })
      .then(updatedUser => {
        if (updatedUser) {
          // User updated successfully, return the updated User
          res.json(updatedUser);
        } else {
          // User not found
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        // Error updating User
        res.status(500).json({ error: 'Failed to update User' });
      });
  },
  deleteUser: (req, res) => {
    const id = req.params.userId;

    // Find the User in the database and delete it
    User.findByIdAndDelete(id)
      .then(deletedIdUser => {
        if (deletedIdUser) {
          // User deleted successfully
          res.json({ message: 'User deleted successfully' });
        } else {
          // User not found
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(error => {
        // Error deleting User
        res.status(500).json({ error: 'Failed to delete User' });
      });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    User.find({ $or: [{ username }, { email: username }] }).then((users) => {
      if (users.length === 0) {
        console.log("exists");
        return res.status(401).json({ message: 'Auth Failed' })
      }
      const [user] = users;
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          console.log("code pass");
          return res.status(401).json({ message: 'Auth Failed' })

        }
        if (result) {
          const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
          }, 'Riddles', {
            expiresIn: "1H"
          })
          return res.status(200).json({ message: "Auth successful!" })
          token
        }
        console.log("dif");
        return res.status(401).json({ message: 'Auth Failed' })

      })
    })
  },
  useSite:()=>{
   User.count=User.count+1;
  },
  getCount:()=>{
    return User.count;
  }

}
