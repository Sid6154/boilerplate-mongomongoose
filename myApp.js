/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */
require('dotenv').config();
const { response } = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Connection string:', process.env.MONGO_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
  });
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);
//the part where there could be errors
const freeCodeCamp = function(done){
  return new Person({
    name: 'Siddhant',
    age: 18,
    favoriteFoods: ['pizza','burger'] 
  });
  if (error) return done(error);
  done(null, result)
};


const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  
};
const arrayOfPeople = [
  {name: 'sai', age: 18, favoriteFoods: ["idli", 'dosa']},
  {name: 'satwik', age: 18, favoriteFoods: ["brain", 'gp']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName,done)=>{
  Person.find({name: personName},(err,personFound) =>{
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err,data)=>{
    if (err) return console.log(err);
    done(null, data);
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err,personId)=>
  {
    if (err) return console.log(err);
    done(null, personId);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,Person)=>
    {
      if (err) return console.log(err);
      Person.favoriteFoods.push(foodToAdd);
      Person.save((err, updatePerson) => {
        if (err) return console.error(err);
        done(null, updatePerson);
      })
    })
    
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.error(err);
    done(null, updatedDoc);

  }

  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,removedDoc)=>{
    if(err) return console.log(err);
    done(null, removedDoc);
  }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,response)=>{
    if(err) return console.log(err);
    done(null, response);
  })
};
// const queryChain = (done) => {
//   const foodToSearch = "burrito";
//   Person.find({name:foodToSearch});
//   Person.sort({age: -1});
//   Person.limit(5);
//   Person.select({name:1, age:0});
//   Person.exec((err,people)=
//    { if (err) return console.log(err);
//     done(null, people)});
// };
const queryChain = (done) => {
  console.log("queryChain function called");
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      console.log("Query executed", err, data);
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;