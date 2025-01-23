const mongoose = require('mongoose');

//const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = 'mongodb+srv://sunny773841:V8toXOo4XzosstHA@cluster0.aneav.mongodb.net'

// set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// get the default connection 
const db = mongoose.connection;

// define event listener for database connection
db.on('connected', () => {
    console.log('connected to MongoDB server ');
})

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// export database connection
module.exports = db;