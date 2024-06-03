const mongoose = require('mongoose');
const Riddle = require('../models/riddle.model');
const Subject = require('../models/subject.model')
const Difficulty = require('../models/difficulty.model');
const Age = require('../models/age.model');

module.exports = {
	getAllRiddle: (req, res) => {
		const { difficulty, age, subject } = req.query;

		// if (difficulty || age || subject)
			// {&& {certified}
			// Find all  Riddle in the database
			Riddle.find({ $or: [{ difficultyId: difficulty }, { ageId: age }, { subjectId: subject }] })
				.populate({ path: 'subjectId', select: 'subject_riddle' })
				.populate({ path: 'difficultyId', select: 'difficulty_riddle' })
				.populate({ path: 'ageId', select: 'age_range' })
		//}
		// else 
		//{
			Riddle.find()
				.then(riddles => {
					console.log(riddles);
					res.status(200).json(riddles);
				})
				.catch(err => {
					// Error finding  Riddle
					res.status(500).json({ error: 'Failed to get Riddle' });
				});
		//}
	},
	getAllCertified: (req, res) => {
		// Find all subject in the database
		Riddle.find(!{certified})
		  .then(riddle => {
			res.json(riddle);
		  })
		  .catch(err => {
			// Error finding subject
			res.status(500).json({ error: 'Failed to get riddle' });
		  });
	  },
	getById: (req, res) => {
		const id = req.params.riddleId;

		// Find the  Riddle in the database
		Riddle.findOne({ id })
			.then(foundIdRiddle => {
				if (foundIdRiddle) {
					//  Riddle found, return it
					res.json(foundIdRiddle);
				} else {
					// Riddle not found
					res.status(404).json({ error: 'Riddle not found' });
				}
			})
			.catch(err => {
				// Error finding Riddle
				res.status(500).json({ error: 'Failed to get Riddle' });
			});
	},
	createRiddle: async (req, res) => {
		// console.log(req.file);
		debugger
		const image = req.file?.path;

		const { name: riddlename, question, solution, subject: subjectId, difficulty: difficultyId, age: ageId, certified } = req.body;

		// Check if subjectId and difficultyId exist
		if (!subjectId || !difficultyId || !ageId) {
			return res.status(400).json({ error: 'subjectId and difficultyId and ageId are required' });
		}

		// Check if subjectId is an existing category
		const subject = await Subject.findById(subjectId)
		if (!subject) {
			return res.status(400).json({ error: 'subject does not exist' });
		}
		else {
			const difficulty = await Difficulty.findById(difficultyId);
			if (!difficulty) {
				return res.status(400).json({ error: 'difficulty does not exist' });
			}
			else {
				const age = await Age.findById(ageId);
				if (!age) {
					return res.status(400).json({ error: 'age does not exist' });
				}
			}

			// Create a new Riddle
			const newRiddle = new Riddle({ riddlename, question, solution, subjectId, difficultyId, ageId, image ,certified});

			try {
				// Save the new Riddle to the database
				await newRiddle.save();
				// Riddle created successfully, return the created Riddle
				res.status(201).json(newRiddle);
			} catch (error) {
				// Error saving Riddle
				res.status(500).json({ error: 'Failed to create Riddle' });
			}
		}

		// Error finding subject
		// res.status(500).json({ error: 'Failed to find subject' });

	},
	updatedRiddle: (req, res) => {
		const id = req.params.riddleId;
		console.log(req.file);
		const { path: image } = req.file;
		const { riddlename, question, solution, subjectId, difficultyId, ageId } = req.body;

		// Check if subjectId and difficultyId exist
		if (!subjectId || !difficultyId || !ageId) {
			return res.status(400).json({ error: 'subjectId and difficultyId and ageId are required' });
		}

		// Check if subjectId is an existing category
		Subject.findById(subjectId)
			.then(subject => {
				if (!subject) {
					return res.status(400).json({ error: 'subjectId does not exist' });
				}

				// Check if difficultyId is an existing category
				Difficulty.findById(difficultyId)
					.then(difficulty => {
						if (!difficulty) {
							return res.status(400).json({ error: 'difficultyId does not exist' });
						}
						// Check if difficultyId is an existing category
						Age.findById(ageId)
							.then(age => {
								if (!age) {
									return res.status(400).json({ error: 'ageId does not exist' });
								}
							})

						// Find the Riddle in the database and update its properties
						Riddle.findOneAndUpdate({ id }, { riddlename, question, solution, subjectId, difficultyId, ageId, image }, { new: true })
							.then(updatedRiddle => {
								if (updatedRiddle) {
									// Riddle updated successfully, return the updated Riddle
									res.json(updatedRiddle);
								} else {
									// Riddle not found
									res.status(404).json({ error: 'Riddle not found' });
								}
							})
							.catch(err => {
								// Error updating Riddle
								res.status(500).json({ error: 'Failed to update Riddle' });
							});
					})
					.catch(err => {
						// Error finding difficulty
						res.status(500).json({ error: 'Failed to find difficulty' });
					});
			})
			.catch(err => {
				// Error finding subject
				res.status(500).json({ error: 'Failed to find subject' });
			});


	},
	deleteRiddle: (req, res) => {
		const id = req.params.riddleId;

		// Find the Riddle in the database and delete it
		Riddle.findByIdAndDelete(id)
			.then(deletedIdRiddle => {
				if (deletedIdRiddle) {
					// Riddle deleted successfully
					res.json({ message: 'Riddle deleted successfully' });
				} else {
					// Riddle not found
					res.status(404).json({ error: 'Riddle not found' });
				}
			})
			.catch(error => {
				// Error deleting Riddle
				res.status(500).json({ error: 'Failed to delete Riddle' });
			});
	},
	entryRiddle: (req, res) => {
		const id = req.params.riddleId;
		const status = req.body;
		Riddle.findOne({ riddleId: id })
			.then(riddle => {
				if (riddle) {
					if (status == 1)
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
	

setCertified: (req, res) => {
    const id = req.params.riddleId;
    const status = req.body;
    Riddle.findOne({ riddleId: id })
        .then(riddle => {
            if (riddle) {
               
                    riddle.certified = status;
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
}
