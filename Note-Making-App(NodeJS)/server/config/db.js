const mongoose = require('mongoose');
// mongoose.setDriver('strictQuery', false);

const connectDB = async(url) => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`Database Connected`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
