const express=require("express");
const postgresClient=require("../config/postgresDbConnect.js");
const bcrypt = require("bcryptjs");
const router=express.Router();
const createToken=require("../middlewares/auth.js");

router.post('/register',async(req,res)=>{
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const text = "SELECT add_user($1, $2, $3) "
        const values = [username,email,hashedPassword]
        const {rows}=await postgresClient.query(text,values);
        res.status(201).json({createdUser:rows[0]});
    } catch (error) {
        console.log('Error occured ',error.message);
        return res.status(400).json({message:error.message});
    }
});
// Authenticate user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const text = "SELECT * FROM users WHERE email = $1"

        const values = [email]

        const { rows } = await postgresClient.query(text, values)
        if(!rows[0]){
            return res.status(404).json({ message: 'User not found.' })
        }
        const isPasswordValid = await bcrypt.compare(password, rows[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password." });
        }
        createToken(res,rows[0]);
        

    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })        
    }
})

module.exports = router;