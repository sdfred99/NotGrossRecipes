const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all recipes
router.get('/', (req, res) => {
  db.all('SELECT * FROM recipes WHERE Deleted = 0', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json(rows);
  });
});

// Get individual recipe
router.get('/:recipeID', (req, res) => {
  const { recipeID } = req.body;
  db.get('SELECT * FROM recipes WHERE RecipeID = ? and Deleted = 0', 
    [recipeID], 
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
    res.status(201).json(row);
  })
})

// Add a recipe
router.post('/', (req, res) => {
  const { name, peopleServed } = req.body;

  db.run(
    'INSERT INTO Recipes (Name, Deleted, PeopleServed) VALUES (?, 0, ?)',
    [name.trim(), peopleServed],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        RecipeID: this.lastID
      });
    }
  );
});

// Delete a recipe 
router.delete('/:recipeID', (req, res) => {
  const { recipeID } = req.params;
  console.log("recipeID: " + recipeID)

  db.run(
    'UPDATE Recipes SET Deleted = 1 WHERE RecipeID = ?',
    [recipeID],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true
      });
    }
  );
});

module.exports = router;
