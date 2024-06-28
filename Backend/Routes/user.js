const { Router } = require('express');
const router = Router();
const { signup, signin, updateUser } = require("../type");
const { User, Account } = require("./../db/db");
const jwt = require('jsonwebtoken');
const { Secret } = require('./../config');
const { authMiddleware } = require("./../middleware")

// signup route
router.post("/signup",async (req,res)=>{

    const response = signup.safeParse(req.body);

    if(!response.success){
        return res.status(411).json({
            "msg" : "Incorrect Inputs!"
        })
    }

    const isExist = await User.findOne({
        username : req.body.username
    });

    if (isExist){
        return req.status(403).json({
            "msg" : "Email already exist!!"
        })
    }

    const user = new User({
            username : req.body.username,
            firstName : req.body.firstName,
            lastName : req.body.lastName
    });

    let hashedPassword = await user.createHash(req.body.password);
    user.password = hashedPassword;

    await user.save();

    let userId = user._id;

    // assigning balance to account when user sign in
    await Account.create({
        userId,
        balance : Math.round(Math.random(1) * 1000, 2)
    })

    // can be done like this, by creating object of Account model 
    // const account = new Account({
    //     userId,
    //     balance : Math.round(Math.random(1) * 100, 2)
    // });

    // await account.save();

// code if encrytion doesn't used
    // const user = await User.create({
    //     username : req.body.username,
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName,
    //     // password : req.body.password
    // });

    

    try{
        const token = jwt.sign({
            userId
        },Secret)

        res.json({
            "msg" : "user created successfully",
            "token" : token
        })
    }catch(err){
        req.json({
            "msg" : "Something wrong in creating token"
        })
    }


})


// signin route
router.post("/signin", async (req,res)=>{

    const response = signin.safeParse(req.body)

    if(!response.success){
        return res.status(411).json({
            "msg" : "Invalid Inputs!!"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        // password : req.body.password because we store hashed password
    })

    if (!user){
        return res.status(404).json({
            "msg" : "User not found"
        })
    }else{
        const userId = user._id;
        try{
            if ( await user.validatePasswords(req.body.password)){
                try{
                    const token = jwt.sign({
                        userId
                    },Secret)
                    
                    res.status(200).json({
                        "msg" : "Sign in successfully",
                        "token" : token
                    })
                }catch(err){
                    res.status(403).json({
                        "msg" : "Erro while loggin in"
                    })
            }
        }}catch(err){
            res.status(403).json({
                "msg" : "Error while checking hashed password"
            })
        }
    }


})

// route to update data
router.put("/", authMiddleware, async (req,res)=>{

    const response = updateUser.safeParse(req.body);

    if (!response.success){
        return res.status(411).json({
            "msg" : "Invalid Inputs!!"
        })
    }

    await User.updateOne({
        _id : req.userId
    }, req.body)
    
    
})


// route for searching based on firstName and lastName
router.get("/bulk", async (req,res)=>{

    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }
        ]
    })

    res.json({
        "user" : users.map((user) =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id

        }))
    })
})




module.exports = router;
