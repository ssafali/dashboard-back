const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Todo = require("../models/ToDo.model");
const User = require("../models/User.model");

// Get all todos
router.get('/todos/:_id', async (req, res) => {
    const _id = req.params._id
    console.log('The id!!!!!!!!!!!:', _id)
    const todos = await Todo.find({user: _id});
    res.json(todos)
})

// Add a new todo
router.post('/todos/new', (req, res, next) => {
    const {title,content,category, user} = req.body;
    
    Todo
    .create({title, content, category, user: mongoose.Types.ObjectId(user)})
    .then((data) => {
        console.log("Added successfully!")
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
router.post('/todos/delete/:id', (req, res, next) => {
    const { _id } = req.params
    Todo.findByIdAndDelete(_id)
        .then(() => res.send("Deleted successfully!"))
        .catch((err) => console.log(err));
    })


    // router.post("/search-results", (req, res, next) => {
    //     const search = req.body.search;
    //     console.log(search)
    //     let matchingProducts = [];
    //     Product.find({})
    //     .then((productsFromDB) => {
    //       console.log(productsFromDB)
    //       //const newArray = productsFromDB.filter(element => element.title.includes(searchKey))
    //       for(let data of productsFromDB) {
    //         if(data.title.toLowerCase().search(search.toLowerCase()) != -1) {
    //           matchingProducts.push(data);
    //         }
    //       }
    //       res.render('products/search-results.hbs', {products: matchingProducts, search})
    //     })
    //   })
module.exports = router;