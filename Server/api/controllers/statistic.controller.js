const mongoose = require('mongoose');
const Riddle = require('../models/riddle.model');
const User = require('../models/user.model');

module.exports={

     getAllRiddlesName : () => {
        try {
          const riddleNames = Riddle.map((r) => r.riddlename);
          return riddleNames;
        } catch (error) {
          console.error("An error occurred while retrieving riddle names:", error);
          return []; // מחזיר מערך ריק במקרה של שגיאה
        }
      },
        
    getAllRiddlesSatisfied:()=>{
        try {
            const satisfied = Riddle.map((r) => r.satisfied);
            return satisfied;
          } catch (error) {
            console.error("An error occurred while retrieving riddle satisfied:", error);
            return []; // מחזיר מערך ריק במקרה של שגיאה
          }
    },
    getAllRiddlesUnSatisfied:()=>{
        try {
            const unsatisfied = Riddle.map((r) => r.unsatisfied);
            return unsatisfied;
          } catch (error) {
            console.error("An error occurred while retrieving riddle unsatisfied:", error);
            return []; // מחזיר מערך ריק במקרה של שגיאה
          }
    },
entryRiddle: (req, res) => {
    const id = req.params.riddleId;
    const status = req.body;
    Riddle.findOne({ riddleId: id })
        .then(riddle => {
            if (riddle) {
                if (status === '1')
                    riddle.satisfied = riddle.satisfied + 1;
                else
                    riddle.unsatisfied = riddle.unsatisfied + 1;
                return riddle.save();
            } else {
                res.status(404).send("Riddle not found");
            }
        })
        .then(updatedRiddle => {
            res.status(200).json(updatedRiddle);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
},
getCountSatisfied: (req, res) => {
    const id = req.params.riddleId;
    Riddle.findOne({ riddleId: id })
        .then(riddle => {
            {

                return riddle.satisfied;
            }
        })
},

getCountUnSatisfied: (req, res) => {
    const id = req.params.riddleId;
    Riddle.findOne({ riddleId: id })
        .then(riddle => {
            {

                return riddle.unsatisfied;
            }
        })
},
useSite:()=>{
    User.count=User.count+1;
   },
   getCount:()=>{
     return User.count;
   },
   popular:()=>{
    const max=Math.max(Riddle.map(r => r.satisfied+r.unsatisfied))
    const maxRiddle = Riddle.find(r => r.satisfied+r.unsatisfied === max);
    return maxRiddle;
   }
 
}