const zod = require('zod');


const signup = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const signin = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const updateUser = zod.object({
    password : zod.string().optional(),
    lastName : zod.string().optional(),
    firstName : zod.string().optional()
})



module.exports = {
    signup,
    signin,
    updateUser
}