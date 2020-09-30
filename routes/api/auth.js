const router = require('express').Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [
    check('email','Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],

async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{ email, password } = req.body;

    try{
         //check user exist
         let user = await User.findOne({email});

         if(!user){
             return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
         }

         //password check
         const isMatch  = await bcrypt.compare(password, user.password);
         if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
         }
         
    // return jwt
         const payload = {
             user: {
                 id:user.id
             }
         }
         jwt.sign(payload, 
            config.get('jwtSecret'),
            {expiresIn: 36000}, 
            (err, token)=>{
             if(err) throw err;
             res.json({token});
         });
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
   
});
module.exports = router;