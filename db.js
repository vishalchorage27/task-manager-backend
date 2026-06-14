const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db_url = process.env.DB_URL;

const db = async () => {
    if (!db_url) {
    console.log("Error: DB_URL not define in .env");
        return;
    }
    try {
        await mongoose.connect(db_url);
        console.log("DB is Connected Successfully");
    } catch (err) {
        console.error("Error: DB Connection Failed", err);
        process.exit(1)
    }
};

module.exports=db;