const mongoose = require('mongoose');
const config = require('config');
const db = config.get('DB_CONNECT');

const connectDB = async () =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;