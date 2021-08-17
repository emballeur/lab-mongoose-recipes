const mongoose = require("mongoose");

/*const RecipeModel = require("./models/Recipe.model");*/

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  /*.then((response) => {
  console.log("mongo connection established");
  return mongoose.connection.dropDatabase();
})*/

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones*/
    return Recipe.deleteMany();
  })
  .then(() => {
    /*return Recipe.create({ title: "Recipe2",  });*/
    // Run your code here, after you have insured that the connection was made
    const data = require("./data");
    return Recipe.insertMany(data);
  })

  // iteration 4
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  //iteration 5
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
