const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

mongoose.connect('mongodb+srv://sa:sa@petstorecluster.olokn.mongodb.net/?retryWrites=true&w=majority&appName=PetStoreCluster')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Connection error rrr', err);
});

const userSchema = new mongoose.Schema({ 
  name: String, 
  email: String, 
  age: Number, 
}); 
  

const User = mongoose.model('User', userSchema);
app.use(express.json());

app.get('/', (req, res) => {
  const user = new User({ 
    name: 'maknaz', 
    email: 'test', 
    age: 13
  }); 
  try 
  { 
    const newUser = user.save(); 
    res.status(201).json(newUser);
    console.log("success",newUser);
  } 
  catch (err) 
  { 
    res.status(400).json({ message: err.message }); 
  } 
  //res.send('Hello World! mmm');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
