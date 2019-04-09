const router = require('express-promise-router')();
const userValidation = require('../utils/userValidation');
const articleController = require('../controllers/article.controller');

//Protect routes where the user must be authenticated and be an administrator
router.use(['/create','/update/:articleId','/delete:articleId'], async (request, response, next)=> {
    var user = await userValidation.getUserBySession(request.body);
    if(!user || !user.isAdmin){
        return response.status(403).send({ error:'wrong session token' });
    } else {
        next();
    }
});

//Protect routes where the user have to be authenticated
router.use(['/read/:articleId', '/like/:articleId'], async (request, response, next) => {
    var user = await userValidation.getUserBySession(request.body);
    if(!user){
        return response.status(403).send({ error:'wrong session token' });
    } else {
        next();
    }
});

/**
 * To create a article follow this JSON format :
 * {
 *      session: "user token session", //the user must be an admin
 *      article: {
 *                  title: "article title",
 *                  text:  "article text",
 *               }
 * }
 */
router.route('/create')
    .post(articleController.create);

/**
 * To update a article follow this JSON format :
 * {
 *      session: "user token session", //the user must be an admin
 *      article: {
 *                  id: "article id",
 *                  title: "article title",
 *                  text:  "article text",
 *                  isHidden: boolean
 *               }
 * }
 */
router.route('/update')
    .post(articleController.update);

/**
 * To update a article follow this JSON format :
 * {
 *      session: "user token session", //the user must be an admin
 *      article: {
 *                  id: "article id"
 *               }
 * }
 */
router.route('/delete/:articleId')
    .post(articleController.delete);

/**
 * To update a article follow this JSON format :
 * {
 *      session: "user token session",
 *      article: {
 *                  id: "article id"
 *               }
 * }
 */
router.route('/read/:articleId')
    .post(articleController.read);

/**
 * To update a article follow this JSON format :
 * {
 *      session: "user token session",
 *      article: {
 *                  id: "article id"
 *               }
 * }
 */
router.route('/like/:articleId')
    .post(articleController.like)

router.route('/list')
    .post(articleController.list)

module.exports = router;