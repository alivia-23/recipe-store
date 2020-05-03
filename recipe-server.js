const users = {};
const recipes = {};

recipes[100000] = {
  id: 100000,
  author: "John Smith",
  title: "Spaghetti",
  ingredients: " 2 large eggs, grated part-skim mozzarella, spaggetti, salt, pepper",
  instructions: "Combine the spaghetti, beaten eggs, mozzarella, parsley,and a pinch each of salt and pepper in a large bowl and toss to combine." +
                "Heat the vegetable oil in an 8 skillet over medium heat." +
                " Add the spaghetti mixture and press down with a spatula." +
                "Cook, until browned, about 5 minutes per side, carefully flipping the whole spaghetti cake with a spatula."
}

recipes[9999] = {
  id: 9999,
  author: "Shreya Mishra",
  title: "Roasted Cauliflower",
  ingredients: "1 small head cauliflower, 1 1/2 teaspoons fennel seeds, 1 1/2 teaspoons smoked paprika" +
                "1 1/4 teaspoons sea salt,1/2 teaspoon ground black pepper, 1/2 teaspoon garlic powder, 2 tablespoons olive oil, 1/2 lemon juiced",
  instructions: " 1) Preheat the oven to 375 degrees F (190 degrees C). 2) Trim large leaves off the cauliflower. 3)Trim stalk so cauliflower can sit flat in a Dutch oven."+
                "Grind fennel seeds with a mortar and pestle. Mix in smoked paprika, salt, pepper, and garlic powder. Whisk in olive oil to form a paste." +
                " Rub the paste all over the cauliflower. Drizzle lemon juice all over."+
                "Bake in the preheated oven, covered, until tender, about 30 minutes." +
                "Uncover and baste with any juices that have pooled at the base. " +
                "Continue baking, uncovered, until top is browned and center feels completely tender when pierced with a paring knife, about 15 minutes.",
}


module.exports = {
  users,
  recipes
}
