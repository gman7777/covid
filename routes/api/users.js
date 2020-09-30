const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');

router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
    .isLength({min:6})
],

async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{ name, email, password } = req.body;

    try{
         //check user exist
         let user = await User.findOne({email});

         if(user){
             return res.status(400).json({errors: [{msg: 'user already exist'}]});
         }

         user = new User({
             name,
             email,
             password
         });

    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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