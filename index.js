const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async (resolve) => {
    // Run your code here, after you have insured that the connection was made

    const newRecipe = {
      title: "Carbonara",
      level: "Easy Peasy",
      ingredients: ["Pasta", "Pepper", "Love"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 50,
      creator: "Oguzhan & Adam",
    };
    const addnewRecipe = await Recipe.create(newRecipe);
    console.log(newRecipe.title);
    return addnewRecipe;
  })
  .then(async () => {
    const recipes = await Recipe.insertMany(data);

    return recipes;
  })
  .then(async () => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    const opt = { new: true };

    const updateRigatoni = await Recipe.findOneAndUpdate(filter, update, opt);

    if (updateRigatoni.duration === update.duration) {
      console.log("Succes");
    }

    return updateRigatoni;
  })
  .then(async () => {
    const condition = { title: "Carrot Cake" };

    const deleteCarrot = await Recipe.deleteOne(condition);

    return deleteCarrot;
  })
  .then(() => {
    //Returns a promise
    return mongoose.disconnect();
  })
  .then(() => {
    return console.log("Disconnected from  the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
