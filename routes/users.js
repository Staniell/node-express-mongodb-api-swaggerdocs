const express = require('express');
const router = express.Router();
const User = require("../model/User");

// Get all users
router.get("/", async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.json({message : err})
    };
});

// A. Update all coin balance of users to initial value (100)
router.patch("/setupcoins", async (req, res) => {
    try{
        const filter = {};
        const updateDoc = {$set: { 
            "coin_balance" : 100, 
        }};

        const updatedUser = await User.updateMany(filter, updateDoc)
        res.json(updatedUser);
        console.log("updated users' coin balance to 100");
    } catch (err){
        res.json({message:err})
    }
})

// A. Add a user with initial coin balance of 100
router.post("/", async (req, res)=>{
    const post = new User({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    });
    try{
        const savedUser = await post.save();
        res.json(savedUser);
    } catch(err){
        res.json({message : err})
    };
});


// B. Transfer coin balance from 1 user to another
router.patch("/transfer/:userId/:userId2", async (req, res) => {
    try{
        var user1 = await User.findById(req.params.userId)
        var user2 = await User.findById(req.params.userId2)

        await User.updateOne({_id : req.params.userId2}, { coin_balance : user1.coin_balance + user2.coin_balance })
        await User.updateOne({_id : req.params.userId}, { coin_balance : 0 })

        user1 = await User.findById(req.params.userId)
        user2 = await User.findById(req.params.userId2)

        res.json([user1, user2])
    } catch (err){
        res.json({message:err})
    }
})


// C. Get a specific user's coin balance
router.get("/:userId", async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user.coin_balance);
    } catch(err){
        if(err.name=="CastError")
            res.json("User ID does not exist");
        res.json({message : err})
    };
})

// Delete a user by user id
router.delete("/:userId",  async (req, res) => {
    try{
        const removeUser = await User.deleteOne({_id : req.params.userId})
        res.json(removeUser)
    } catch(err){
        res.json({message: err})
    }
})

module.exports = router;
