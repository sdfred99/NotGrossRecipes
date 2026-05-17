const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all ingredients
router.get('/', (req, res) => {
    db.all('SELECT * FROM Ingredients', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get ingredients by RecipeID
router.get('/by-recipe', (req, res) => {
    const recipeId = req.query.recipeId;

    if (!recipeId) {
        return res.status(400).json({ error: 'Missing recipeId parameter' });
    }

    db.all(
        'SELECT * FROM Ingredients WHERE RecipeID = ? ORDER BY Name',
        [recipeId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// Add an ingredient
router.post('/', (req, res) => {
    const { RecipeID, Unit, Name, Quantity } = req.body;

    db.run(
        'INSERT INTO Ingredients (RecipeID, Unit, Name, Quantity) VALUES (?, ?, ?, ?)',
        [RecipeID, Unit, Name, Quantity],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, RecipeID, Unit, Name, Quantity });
        }
    );
});

module.exports = router;
