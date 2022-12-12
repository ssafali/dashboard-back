const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const Todo = require("../models/ToDo.model");
const Notes = require("../models/Notes.model");
const User = require("../models/User.model");
const { route } = require("./auth.routes");

// Get all todos
router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

// Add a new todo
router.post('/todos/new', (req, res, next) => {
    const {title,content,category} = req.body;
    Todo
    .create({title, content, category})
    .then((data) => {
        console.log("Added succesfully!")
        res.status(201).json(data);
    })
    .catch((err) => console.log('Error', err));
})

// Edit a note
router.post('/todos/edit/:todoId', (req, res, next) => {
    const {_id, title, content, category} = req.params
    Todo.findByIdAndUpdate(
        _id, {title, content, category})
        .then(() => res.send("Updated succesfully!"))
        .catch((err) => console.log(err));
    })

// Delete a note
router.post('/todos/delete/:todoId', (req, res, next) => {
    const { _id } = req.params
    Todo.findByIdAndDelete(_id)
        .then(() => res.send("Deleted succesfully!"))
        .catch((err) => console.log(err));
    })

    router.get("/verify", isAuthenticated, (req, res, next) => {
        // If JWT token is valid the payload gets decoded by the
        // isAuthenticated middleware and is made available on `req.payload`
        // console.log(`req.payload`, req.payload);
        
        // Send back the token payload object containing the user data
        res.status(200).json(req.payload);
    });

module.exports = router;