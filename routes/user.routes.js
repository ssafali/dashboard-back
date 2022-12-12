const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

/* GET signup page */
router.get("/users/:_id", (req, res, next)=>{
    const { _id } = req.params;
    console.log(_id)
    User.findById(_id)
    .then((user)=>{
        res.json({user});
        console.log(user)
    })
    .catch(err => {
        console.log(err);
        next(err)});
})

router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    // console.log(`req.payload`, req.payload);
    
    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
});

module.exports = router;