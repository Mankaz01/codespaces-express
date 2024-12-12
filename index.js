// Backend Express connected using GitHub Repo for Express and MongoDB using Youtube tutorials

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(
    "mongodb+srv://sa:sa@petstorecluster.olokn.mongodb.net/?retryWrites=true&w=majority&appName=PetStoreCluster",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" }, // Optional image field
});

const Pet = mongoose.model("Pet", petSchema);

// Routes
// GET all pets
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single pet by ID
app.get("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new pet
app.post("/pets", async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing pet
app.put("/pets/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a pet
app.delete("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
