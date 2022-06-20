const mongoose = require("mongoose");

const db = process.env.MONGO_URI || "mongodb+srv://jose:jose@cluster0.7ocom.mongodb.net/tierlist?retryWrites=true&w=majority";

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Lo hemos logrado");
    }catch (e){ 
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;