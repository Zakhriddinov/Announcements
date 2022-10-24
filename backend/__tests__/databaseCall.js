const mongoose = require("mongoose");
const { Category } = require("../models/categoryModel");

beforeAll(async () => {
   await mongoose.connect(
      'mongodb+srv://sardor2002:sardor2002@cluster0.2wp3waw.mongodb.net/elonlardoskasi?retryWrites=true&w=majority',
      {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }
   )
})

afterAll(async () => {
   await mongoose.connection.close()
})

it("Should save category to database", async () => {
   const mockCategory = { name: "test category" };
   await Category.create(mockCategory);

   const insertedCategory = await Category.findOne({ name: "test category" });
   expect(insertedCategory.name).toEqual(mockCategory.name)
})