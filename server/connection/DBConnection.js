const mongoose = require('mongoose')
require('dotenv').config()

exports.DBConnection = async () => {
    try {
        const resp = await mongoose.connect(process.env.MONGODB)
        if(resp){
            console.log("My CRM DB connected");
        }
    } catch (error) {
        console.log("Error connecting to MYCRM DB:", error);
        
    }
}