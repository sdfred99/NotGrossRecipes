'use server';

const express = require('express');
const cors = require('cors');
const app = express();
const recipeRoute = require('./routes/recipes');
const ingredientsRoute = require('./routes/ingredients');
const instructionsRoute = require('./routes/instructions');

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoute); 
app.use('/api/ingredients', ingredientsRoute);
app.use('/api/instructions', instructionsRoute);

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
