const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all instructions
router.get('/', (req, res) => {
    db.all('SELECT * FROM Instructions', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    })
})

// Get all instructions for a recipe
router.get('/by-recipe', (req, res) => {
    const recipeId = req.query.recipeId;

    if (!recipeId) {
        return res.status(400).json({ error: 'Missing recipeId parameter' });
    }

    db.all(
        'SELECT * FROM Instructions WHERE RecipeID = ? ORDER BY StepNumber',
        [recipeId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// Add an instruction
router.post('/', (req, res) => {
    const { RecipeID, Instruction, StepNumber } = req.body;
    db.run('INSERT INTO Instructions (RecipeID, Instruction, StepNumber) VALUES (?, ?, ?)', [RecipeID, Instruction, StepNumber], function(err) {
        if (err) return res.status(500).json({ error: err.message});
        res.json({ id: this.lastID, RecipeID, Instruction, StepNumber})
    })
})

module.exports = router;