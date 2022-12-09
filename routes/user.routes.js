const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

/* GET signup page */
router.get("/users/:_id", (req, res, next)=>{
    const { _id } = req.params;
    
    User.findById(_id)
    .then((user)=>{
        res.json({user});
    })
    .catch(err => {
        console.log(err);
        next(err)});
})

module.exports = router;