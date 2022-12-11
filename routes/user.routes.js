const router = require("express").Router();
const User = require("../models/User.model");

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