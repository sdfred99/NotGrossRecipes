'use server';

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all recipes
router.get('/', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get individual recipe
router.get('/', (req, res) => {
  const { recipeID } = req.body;
  db.run('SELECT * FROM recipes WHERE RecipeID = (recipeID)', [recipeID], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  })
})


// Add a recipe
router.post('/', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO Recipes (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

module.exports = router;
