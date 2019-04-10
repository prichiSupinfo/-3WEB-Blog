const Article = require('../models/article.model');
const User = require('../models/user.model');
const userValidation = require('../utils/userValidation');

function unlikeArticle(user, articleId){
    for( var i = 0; i < user.likedArticles.length; i++){ 
        if ( user.likedArticles[i] === articleId) {
            user.likedArticles.splice(i, 1);
            i--;
        }
    }
    return user.likedArticles
}

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
        var { id } = request.body.article;
        var article = await Article.findById(id);
        //TODO: protect hidden articles
        //TODO: returns comments with article
        response.status(200).json({ article });
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
        var { id } = request.body.article;
        
        var users = await User.find({likedArticles: id});
        await users.forEach(async (user) => {
            user.likedArticles = unlikeArticle(user, id);
            await user.save();
        })

        await Article.findByIdAndDelete(id);

        
        response.status(200).json({
            result: "success",
            info: "Article delted",
        });
    },
    
    like: async (request, response, next) =>{
        var user = await userValidation.getUserBySession(request.body);
        var { id } = request.body.article;
        if(user.likedArticles.includes(id)){
            return response.status(403).json({
                error: "User already like this article"
            }); 
        }

        var article = await Article.findById(id);
        article.likeNumber++;
        await article.save();

        user.likedArticles.push(article.id);
        await user.save();

        response.status(200).json({
            result: "success",
            info: "Article liked",
        });
    },

    unlike: async (request, response, next) => {
        var user = await userValidation.getUserBySession(request.body);
        var { id } = request.body.article;
        if(!user.likedArticles.includes(id)){
            response.status(403).json({
                error: "User can't unlike a article he don't like"
            });
        }

        var article = await Article.findById(id);
        article.likeNumber--;
        await article.save();

        user.likedArticles = unlikeArticle(user, article.id);

        await user.save();

        response.status(200).json({
            result: "success",
            info: "Article unliked",
        });
    },

    list: async (request, response, next) =>{
        var user = await userValidation.getUserBySession(request.body);
        var articles = [];
        if(user.isAdmin){
            articles = await Article.find({})
        } else {
            articles = await Article.find({isHidden: false})
        }
        response.status(200).json({articles});
    },
}