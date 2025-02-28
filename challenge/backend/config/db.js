const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connexion à MongoDB réussie');
    } catch (error) {
        console.error('❌ Échec de la connexion à MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
