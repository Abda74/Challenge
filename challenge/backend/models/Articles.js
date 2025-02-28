const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    author: {
        type: String, required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);