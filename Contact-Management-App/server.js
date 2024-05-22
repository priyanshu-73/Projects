const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/connect')
require('dotenv').config();
const app = express();

//Middlewares
app.use(express.json());
app.use(errorHandler);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

const port = process.env.PORT || 5000;

const start = () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        
    }
}

start();
