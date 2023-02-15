const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/to_do_db');   // to_do_db is db name 

const uri = 'mongodb+srv://harekrishna:harekrishna@cluster0.wbzdzeh.mongodb.net/?retryWrites=true&w=majority'
async function connect()
{
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDb");
    }catch(error)
    {
        console.error(error);
    }
}

connect();