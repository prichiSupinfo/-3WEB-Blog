const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    writer: {type: Schema.Types.ObjectId, required: true},
    likeNumber: {type: Number, require: true},
    date: {type: Date, required: true},
    isHidden: {type:Boolean, required: true},
    comments: {type: [Object], required: false}
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;