const { Router } = require('express');
const { authMiddleware } = require('../middleware');
const router = Router();
const { Account } = require("../db/db");
const { default: mongoose } = require('mongoose');

// route to get account balance 
router.get("/balance", authMiddleware, async(req,res)=>{

    const user = await Account.findOne({
        userId : req.userId
    })

    if (!user){
        return res.status(404).json({
            "msg" : "User not found!!"
        })
    }

    res.status(200).json({
        "balance" : user.balance
    })
})


// route to transfer money from one account to another account
router.post("/transfer", authMiddleware, async (req,res) =>{

    const session = await mongoose.startSession();
    
    session.startTransaction();
    const to = req.body.to;
    const amount = req.body.amount;

    const toAccount = await Account.findOne({
        userId : to
    })

    if (!toAccount){
        session.abortTransaction();
        return res.status(400).json({
            "msg" : "Invalid account!"
        })
    }

    const fromAccount = await Account.findOne({
        userId : req.userId
    })

    if (fromAccount.balance < amount){
        session.abortTransaction();
        return res.status(400).json({
            "msg" : "Insufficient balance"
        })
    }


    await Account.updateOne({
        userId : req.userId
    },{
        "$inc":{
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({
        userId : to
    },{
        "$inc":{
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        "msg" : "Transfer successfull"
    });
    
})


module.exports = router;