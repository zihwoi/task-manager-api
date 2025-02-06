const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db'); // Import getDB from db.js

const router = express.Router();

// Create a Task
router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const task = { title, description, completed: false };
    const result = await getDB().collection('tasks').insertOne(task);
    res.status(201).json({ id: result.insertedId, ...task });
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await getDB().collection('tasks').find().toArray();
    res.json(tasks);
});

// Update a Task
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (completed !== undefined) update.completed = completed;

    const result = await getDB().collection('tasks').updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully' });
});

// Delete a Task
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getDB().collection('tasks').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
