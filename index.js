const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
   try {
      // Connection to the database "recipe-app"
      const dbConnection = await mongoose.connect(MONGODB_URI);
      console.log(
         `Connected to the database: "${dbConnection.connection.name}"`
      );

      // Before adding any recipes to the database, let's remove all existing ones
      await Recipe.deleteMany();

      // Run your code here, after you have insured that the connection was made
      const newRecipe = {
         title: "Bacalhau",
         level: "UltraPro Chef",
         cuisine: "Tuga",
         creator: "Bruno Aleixo",
      };
      const createdRecipe = await Recipe.create(newRecipe);
      console.log("Recipe created:", createdRecipe.title);

      const addDataRecipe = await Recipe.insertMany(data);
      const allRecipes = await Recipe.find({}, { title: 1, _id: 0 });
      console.log("Data added:", allRecipes);

      const updateRecipe = await Recipe.findOneAndUpdate(
         { title: "Rigatoni alla Genovese" },
         { duration: 100 },
         { new: true }
      );
      console.log("successfully update:", updateRecipe);

      const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log("removed recipe");
   } catch (error) {
      console.log(error);
   } finally {
      await mongoose.connection.close();
      console.log("Connection closed");
   }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
