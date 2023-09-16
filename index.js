const mongoose = require('mongoose');
require('dotenv').config(); 

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

// Create a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create a Person model
const Person = mongoose.model('Person', personSchema);

// Create and save a record
const createAndSavePerson = async () => {
  try {
    const newPerson = new Person({
      name: 'mahdi',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger'],
    });

    const savedPerson = await newPerson.save();
    console.log('Person saved:', savedPerson);
  } catch (error) {
    console.error('Error saving person:', error);
  }
};

createAndSavePerson();

// Create many records using model.create()
const createManyPeople = async () => {
  try {
    const arrayOfPeople = [
      { name: 'amani', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
      { name: 'ahmed', age: 35, favoriteFoods: ['Steak', 'Chicken'] },
    ];

    const createdPeople = await Person.create(arrayOfPeople);
    console.log('People created:', createdPeople);
  } catch (error) {
    console.error('Error creating people:', error);
  }
};

createManyPeople();

// Find people by name using model.find()
const findPeopleByName = async (name) => {
  try {
    const foundPeople = await Person.find({ name });
    console.log('People found by name:', foundPeople);
  } catch (error) {
    console.error('Error finding people by name:', error);
  }
};

findPeopleByName('mahdi');


// Find one person by favorite food using model.findOne()
const findPersonByFood = async (food) => {
    try {
      const foundPerson = await Person.findOne({ favoriteFoods: food });
      console.log(`Person who likes ${food}:`, foundPerson);
    } catch (error) {
      console.error('Error finding person by food:', error);
    }
  };
  
  findPersonByFood('Pizza');
  
  // Find person by _id using model.findById()
  const findPersonById = async (personId) => {
    try {
      const foundPerson = await Person.findById(personId);
      console.log('Person found by ID:', foundPerson);
    } catch (error) {
      console.error('Error finding person by ID:', error);
    }
  };
  
  findPersonById('6505c37bc63c1ca5770fc7c9');
  
  // Perform Classic Updates by Running Find, Edit, then Save
  const updatePersonById = async (personId) => {
    try {
      const foundPerson = await Person.findById(personId);
      if (!foundPerson) {
        console.log('Person not found.');
        return;
      }
  
      foundPerson.favoriteFoods.push('Hamburger');
      const updatedPerson = await foundPerson.save();
      console.log('Person updated:', updatedPerson);
    } catch (error) {
      console.error('Error updating person by ID:', error);
    }
  };
  
  updatePersonById('6505c278c8decd24d26f5a90');
  
  // Perform New Updates on a Document Using model.findOneAndUpdate()
  const updatePersonByName = async (personName) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
  
      console.log('Person updated by name:', updatedPerson);
    } catch (error) {
      console.error('Error updating person by name:', error);
    }
  };
  
  updatePersonByName('ahmed');
  
  // Delete one document by _id using model.findByIdAndRemove()
  const deletePersonById = async (personId) => {
    try {
      const removedPerson = await Person.deleteOne({id:personId});
      console.log('Person deleted by ID:', removedPerson);
    } catch (error) {
      console.error('Error deleting person by ID:', error);
    }
  };
  
  deletePersonById('6505c278c8decd24d26f5a90');
  
  // MongoDB and Mongoose - Delete Many Documents with model.remove()
  const deleteManyPeople = async () => {
    try {
      const result = await Person.remove({ name: 'Mary' });
      console.log('People deleted by name. Result:', result);
    } catch (error) {
      console.error('Error deleting people by name:', error);
    }
  };
  
  deleteManyPeople();
  