const mongoose = require('mongoose');

exports.connectToDB = async function () {
    await mongoose.connect(process.env.DB_URL);

    // mongoose.connection.on('connected', () => {
        console.log('mongoDB Connected');
    // });
}