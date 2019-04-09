const Article = require('../models/article.model');
const userValidation = require('../utils/userValidation');

module.exports = {
    create: async (request, response, next) =>{
        var user = await userValidation.getUserBySession(request.body);
        var { title, text } = request.body.article;
        var article = new Article({ title, text,  writer: user.id, likeNumber: 0, date: Date.now(), isHidden: true });
        await article.save();
        response.status(200).json({ 
            result: "success",
            info: "New article save",
        });
    },

    read: async (request, response, next) =>{

    },

    update: async (request, response, next) =>{
        var user = await userValidation.getUserBySession(request.body);
        var { id, title, text, isHidden } = request.body.article;
        var article = await Article.findById(id);
        article.title = title;
        article.text = text;
        article.isHidden = isHidden;
        article.writer = user.id;

        await article.save();

        response.status(200).json({
            result: "success",
            info: "Article updated",
        });
    },

    delete: async (request, response, next) =>{

    },
    
    like: async (request, response, next) =>{

    },

    list: async (request, response, next) =>{

    },
}