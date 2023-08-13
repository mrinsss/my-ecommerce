const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes 
const userRoutes = require('./routes/user');

// environment variables or say constants
env.config();

// mongodb connection 
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-h74o8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log('Database connected')
});

app.use(bodyParser()); // app.use(express.json()); // middleware to receive the json data request
app.use('/api', userRoutes);

// api routes define samples
/*
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello from server"
    });
});
app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
});
*/


app.listen(process.env.PORT, () => {
    console.log(`Server is running in port: ${process.env.PORT}`);
});