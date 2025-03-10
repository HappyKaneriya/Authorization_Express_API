const mongos = require('mongoose');

const url = "mongodb+srv://happykaneriya0706:IG5hlBPz68OJve3F@cluster0.96l6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

function mongoDbConnection() {
    mongos.connect(url)
        .then(() => {
            console.log('MongoDB connected successfully!');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}

module.exports = mongoDbConnection;